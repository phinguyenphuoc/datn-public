import React, { useEffect, useState } from "react"
import { Auth } from "aws-amplify";
import { getAuth } from "../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { getMeetingRoom } from "../../../redux/actions/meeting";
import _ from "lodash";
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from "styled-components";
const StyledInfo = styled.section`
  .thumbnail-waiting {
    height: 80vh;
  }
  #remote-video {
    width: auto;
    background: #424141;
    padding: 20px;
    margin: 100px auto;
  }
  #local-video {
    width: 300px;
    background: black;
    padding: 5px;
    height: 200px;
    margin: 5px;
    position: absolute; 
    right: 5%; 
    top: 100px;
  }
  @media only screen and (max-width: 700px) {
    #remote-video {
      width: 500px;
      background: #424141;
      padding: 20px;
      margin: 100px auto;
    }
    #local-video {
      width: 200px;
      background: black;
      padding: 5px;
      height: 150px;
      margin: 5px;
      position: relative; 
    }
    .thumbnail-waiting {
      height: 60vh;
    }
  }
  @media only screen and (max-width: 500px) { 
    #remote-video {
      width: 450px;
      background: #424141;
      margin: 100px auto;
    }
    .thumbnail-waiting {
      height: 40vh;
    }
  }
`
const apiKeySid = 'SKPw1DOyTfOeb2lzyjUSE9s1sFSAc2zkV';
const apiKeySecret = 'dUZ4OUswZ3dDRWpHMnc4SUUzVkt6aXg3NFVxMjIwMg==';
var jwt = require('jsonwebtoken');

async function getAccessToken() {
  const currentSession = await Auth.currentSession();
  const userId = currentSession.accessToken.payload.sub
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 36000;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    userId: userId
  };
  var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
  return token;
}

const getRoomToken = (roomId) => {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 36000;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    roomId,
    permissions: {
      publish: true,
      subscribe: true,
      control_room: true
    }
  };
  var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
  console.log("room token: ", token)
  return token;
}
let room;
let localTracks = [];
let subscribedTracks = [];

const client = new window.StringeeClient();

function Meeting(props) {
  const roomId = props.match.params.room;
  const schedule = useSelector((store) => store.parent.schedulesUpcomming);
  const student = useSelector((store) => store.meeting.student);
  const teacher = useSelector((store) => store.meeting.teacher);
  const auth = getAuth()
  const roles = _.get(auth, "user_roles[0]", "student")

  const [showJoinRoom, setShowJoinRoom] = useState(true);
  const [showShareScreen, setShowShareScreen] = useState(true);
  const [mute, setMute] = useState(false);
  const [disableLocal, setDisableLocal] = useState(false);
  const [leave, setLeave] = useState(false);
  const [connectStatus, setConnectStatus] = useState(false)
  const [showBackground, setShowBackground] = useState(true);

  const resetButton = () => {
    setShowJoinRoom(true)
    setShowShareScreen(true)
    setMute(false)
    setLeave(false)
    setShowBackground(true)
  }

  const joinRoomBtn = () => {
    setShowJoinRoom(false)
    setLeave(true)
  }

  const connect = async () => {
    const access_token = await getAccessToken();
    client.connect(access_token);
  }

  const settingsClientEvents = client => {
    client.on('authen', function (res) {
      console.log('on authen: ', res);
      if (res.r === 0) {
        if (!room) {
          testPublish(false);
        }
      }
    });

    client.on('disconnect', function () {
      console.log('disconnected');
    });

    client.on('requestnewtoken', function () {
      // getAccessTokenAndConnectToStringee(client)
    });
  }

  useEffect(() => {
    getMeetingRoom(props.match.params.room)
    client.on('authen', function (res) {
      console.log('on authen: ', res);
      setConnectStatus(true)
    });

    client.on('disconnect', function () {
      console.log('disconnected');
    });

    client.on('requestnewtoken', function () {
      // getAccessTokenAndConnectToStringee(client)
    });
    connect();
  }, [])

  function testJoin() {
    if (!client) {
      settingsClientEvents(client);
      // getAccessTokenAndConnectToStringee(stringeeClient);
    } else {
      testPublish(false);
    }
  }

  const subscribe = (trackInfo) => {
    var subOptions = {
      audio: true,
      video: true
    };

    room.subscribe(trackInfo.serverId, subOptions).then((track) => {
      console.log('subscribe success: ', track);

      subscribedTracks.push(track);

      track.on('ready', function () {
        console.log('track on ready');

        var videoElement = track.attach();
        // videoElement.setAttribute("style", "width: auto;background: #424141;padding: 20px;margin: 100px auto");
        videoElement.setAttribute("id", "remote-video");
        videoElement.setAttribute("controls", "true");
        videoElement.setAttribute("playsinline", true);
        setShowBackground(false)
        document.getElementById('video-call').appendChild(videoElement)
      });
    }).catch(function (res) {
      console.log('subscribe ERROR: ', res);
    });
  }

  const testPublish = (screenSharing = false) => {
    let videoDimensions = '480'
    console.log('videoDimensions: ' + videoDimensions);
    if (videoDimensions == '720p') {
      videoDimensions = {
        width: {
          min: "1280",
          max: "1280"
        },
        height: {
          min: "720",
          max: "720"
        }
      };
    } else if (videoDimensions == '480p') {
      videoDimensions = {
        width: {
          min: "854",
          max: "854"
        },
        height: {
          min: "480",
          max: "480"
        }
      };
    } else if (videoDimensions == '360p') {
      videoDimensions = {
        width: {
          min: "640",
          max: "640"
        },
        height: {
          min: "360",
          max: "360"
        }
      };
    } else if (videoDimensions == '240p') {
      videoDimensions = {
        width: {
          min: "426",
          max: "426"
        },
        height: {
          min: "240",
          max: "240"
        }
      };
    }

    const noneDisplay = {
      width: {
        min: "0",
        max: "0"
      },
      height: {
        min: "0",
        max: "0"
      }
    }

    var pubOptions = {
      audio: true,
      video: true,
      screen: screenSharing, // screenSharing,//screenSharing = true nếu là share màn hình, = false nếu người dùng join room
      videoDimensions: videoDimensions
    };

    window.StringeeVideo.createLocalVideoTrack(client, pubOptions).then(function (localTrack1) {
      console.log('create Local Video Track success: ', localTrack1);
      localTracks.push(localTrack1);

      //play local video
      var videoElement = localTrack1.attach();

      videoElement.setAttribute("id", "local-video");
      videoElement.setAttribute("controls", "true");
      videoElement.setAttribute("playsinline", true);
      document.getElementById('video-call').appendChild(videoElement)
      joinRoomBtn();

      // document.body.appendChild(videoElement);
      window.StringeeVideo.joinRoom(client, getRoomToken(roomId)).then(function (data) {
        console.log('join room success data: ', data);
        room = data.room;

        //room events
        room.clearAllOnMethos();

        //Su kien joinroom
        room.on('joinroom', function (event) {
          console.log('on join room: ' + JSON.stringify(event.info));
        });

        //Su kien leave room
        room.on('leaveroom', function (event) {
          console.log('on leave room: ' + JSON.stringify(event.info));
        });

        //Su kien leave room
        room.on('message', function (event) {
          console.log('on message: ' + JSON.stringify(event.info));
        });

        //Su kien addtrack khi co them nguoi khac join room
        room.on('addtrack', function (event) {
          console.log('on add track: ' + JSON.stringify(event.info));
          var local = false;
          localTracks.forEach(function (localTrack2) {
            if (localTrack2.serverId === event.info.track.serverId) {
              console.log(localTrack2.serverId + ' is LOCAL');
              local = true;
            }
          });
          if (!local) {
            subscribe(event.info.track);
            showBackground(false)
          }
        });

        //Su kien removetrack khi co them nguoi khac leave room
        room.on('removetrack', function (event) {
          console.log('on remove track', event);
          var track = event.track;
          if (!track) {
            return;
          }

          var mediaElements = track.detach();
          console.log({ mediaElements })
          mediaElements.forEach(function (videoElement) {
            videoElement.remove();
          });
          if (event.track && !event.track.screen) {
            setShowBackground(true)
          }
        });

        //publish Track cua chinh minh vao room
        room.publish(localTrack1).then(function () {
          console.log('publish Local Video Track success: ' + localTrack1.serverId);
        }).catch(function (error1) {
          console.log('publish Local Video Track ERROR: ', error1);
        });

        //subscribe video cua nhung nguoi join room truoc
        data.listTracksInfo.forEach(function (trackInfo) {
          subscribe(trackInfo);
        });
      }).catch(function (res) {
        console.log('join room ERROR: ', res);
      });
    }).catch(function (res) {
      console.log('create Local Video Track ERROR: ', res);
    });
  }

  const testUnpublish = () => {
    console.log('Unpublish');
    console.log("localTracks", localTracks)
    localTracks.forEach(function (localTrack, index) {
      if (index === 1) {
        room.unpublish(localTrack);
        localTrack.detachAndRemove();
      }
    });
  }

  const testDisableVideo = () => {
    console.log("localTracks", localTracks)
    localTracks.forEach(function (track) {
      console.log({ track })
      if (track.localVideoEnabled) {
        //disable
        track.enableLocalVideo(false);
        document.getElementById("local-video").style.display = "none";
        setDisableLocal(!disableLocal);
      } else {
        //enable
        track.enableLocalVideo(true);
        document.getElementById("local-video").style.display = "block";
        setDisableLocal(!disableLocal);
      }
    });
  }

  const testMute = () => {
    localTracks.forEach(function (track) {
      if (track.muted) {
        //unmute
        console.log('unmute');
        track.mute(false);
        setMute(false);
      } else {
        //mute
        console.log('mute');
        track.mute(true);
        setMute(true);
      }
    });
  }

  function testLeave() {
    room.leave(true);

    localTracks.forEach(function (track) {
      track.close();
      track.detachAndRemove();
    });
    subscribedTracks.forEach(function (track) {
      track.detachAndRemove();
    });

    localTracks = [];
    subscribedTracks = [];
    resetButton();
  }

  const handleStartOrStopShare = () => {
    if (showShareScreen) {
      testPublish(true);
      setShowShareScreen(false);
    } else {
      testUnpublish();
      setShowShareScreen(true);
    }
  }
  const mainName = roles === "student" ? `${!showJoinRoom ? "Watting for " : ""} ${teacher.first_name} ${teacher.last_name}` : `${!showJoinRoom ? "Watting for" : ""} ${student.first_name} ${student.last_name}`
  const mainAvatar = roles === "student" ? `${teacher.avatar}` : `${student.avatar}`
  return (
    <StyledInfo>
      <div>
        {/* <button id="endCallButton" className="btn btn-danger hidden-first btn-m" onClick={createRoom}>Create room</button> */}
        <div id="video-call" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "black" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 20,
              position: "absolute",
              bottom: "100px",
              zIndex: 12000
            }}
          >
            {showJoinRoom && <button id="joinBtn" onClick={testJoin} className="btn btn-success btn-m">Join room</button>}
            {/* {!showJoinRoom && <button id="shareScreenBtn" onClick={() => testUnpublish()} disabled={false} className="btn btn-info hidden-first btn-m">Stop share</button>} */}
            {!showJoinRoom && <button id="shareScreenBtn" onClick={handleStartOrStopShare} className="btn btn-info hidden-first btn-m">
              {showShareScreen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
            </button>}
            {(mute && !showJoinRoom) && <button id="muteBtn" onClick={testMute} className="btn btn-warning hidden-first btn-m"><MicOffIcon /></button>}
            {(!mute && !showJoinRoom) && <button id="muteBtn" onClick={testMute} className="btn btn-warning hidden-first btn-m"><MicIcon /></button>}
            {!showJoinRoom && <button id="disableVideoBtn" onClick={testDisableVideo} className="btn btn-danger hidden-first btn-m">
              {disableLocal ? <VideocamOffIcon /> : <VideocamIcon />}
            </button>}
            {leave && <button id="leaveBtn" onClick={testLeave} className="btn btn-danger hidden-first btn-m"><ExitToAppIcon /></button>}
          </div>
          {showBackground && <div className="thumbnail-waiting" style={{ width: "90%", padding: "20px", background: "#424141", display: "flex", justifyContent: "center", alignItems: "center", margin: "100px 0px" }}>
            {teacher.avatar && <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <img src={mainAvatar} style={{ width: "200px", borderRadius: "100%" }}></img>
              <p>{mainName}</p>
            </div>}
          </div>}
        </div>
      </div>
    </StyledInfo>
  )
}

export default Meeting