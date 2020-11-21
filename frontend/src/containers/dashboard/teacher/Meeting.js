import React, { useEffect, useRef, useState } from "react"
import { Auth } from "aws-amplify";
import {
  ModalZoomSuccess,
} from "../../../components/dashboard/teacher/profile";
import { getAuth } from "../../../utils/helpers";
import axios from "axios";
import { useSelector } from "react-redux";
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
  // const { room_id } = schedule;
  // console.log(room_id);
  const { student_profile_id } = props
  const auth = getAuth()
  // const profile_id = auth.user_profile_id

  // var roomId = "room-vn-1-LKEODPU1PN-1605739904544";

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
    setDisableLocal(false)
    setLeave(false)
    setShowBackground(true)
  }

  const joinRoomBtn = () => {
    setShowJoinRoom(false)
    setShowShareScreen(true)
    setDisableLocal(true)
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
      console.log('++++++++++++++ disconnected');
    });

    client.on('requestnewtoken', function () {
      console.log('++++++++++++++ requestnewtoken+++++++++');
      // getAccessTokenAndConnectToStringee(client)
    });
  }

  useEffect(() => {
    client.on('authen', function (res) {
      console.log('on authen: ', res);
      setConnectStatus(true)
    });

    client.on('disconnect', function () {
      console.log('++++++++++++++ disconnected');
    });

    client.on('requestnewtoken', function () {
      console.log('++++++++++++++ requestnewtoken+++++++++');
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
        videoElement.setAttribute("style", "width: 100%;background: #424141;padding: 5px 100px 30px;margin: 5px auto");
        videoElement.setAttribute("controls", "true");
        videoElement.setAttribute("class", "local-video");
        videoElement.setAttribute("playsinline", true);
        setShowBackground(false)
        document.getElementById('video-call').appendChild(videoElement)
      });
    }).catch(function (res) {
      console.log('subscribe ERROR: ', res);
    });
  }

  const testPublish = (screenSharing = false) => {
    let videoDimensions = '360p'
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

      videoElement.setAttribute("style", "width: 300px;background: black;padding: 5px;height: 200px;margin: 5px;position: absolute; right: 0; top: 0");
      videoElement.setAttribute("controls", "true");
      videoElement.setAttribute("playsinline", true);
      document.getElementById('video-call').appendChild(videoElement)
      joinRoomBtn();

      // document.body.appendChild(videoElement);
      window.StringeeVideo.joinRoom(client, getRoomToken(roomId)).then(function (data) {
        console.log('join room success data: ', data);
        // $('#shareScreenBtn').removeAttr('disabled');
        // $('#leaveBtn').removeAttr('disabled');

        // $('#muteBtn').removeAttr('disabled');
        // $('#disableVideoBtn').removeAttr('disabled');

        // $('#joinBtn').attr('disabled', 'disabled');

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
          mediaElements.forEach(function (videoElement) {
            videoElement.remove();
          });
          setShowBackground(true)
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
      console.log(res.name + ": " + res.message)
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
      if (track.localVideoEnabled) {
        //disable
        track.enableLocalVideo(false);
      } else {
        //enable
        track.enableLocalVideo(true);
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

  return (
    <div>
      <ModalZoomSuccess
        isOpen={connectStatus}
        handleToggle={() => setConnectStatus(false)}
      />
      {/* <button id="endCallButton" className="btn btn-danger hidden-first btn-m" onClick={createRoom}>Create room</button> */}
      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        {showJoinRoom && <button id="joinBtn" onClick={testJoin} disabled={false} className="btn btn-success btn-m">Join room</button>}
        {!showJoinRoom && <button id="shareScreenBtn" onClick={() => testUnpublish()} disabled={false} className="btn btn-info hidden-first btn-m">Stop share</button>}
        {!showJoinRoom && <button id="shareScreenBtn" onClick={() => testPublish(true)} disabled={false} className="btn btn-info hidden-first btn-m">Share Screen</button>}
        {(mute && !showJoinRoom) && <button id="muteBtn" onClick={testMute} disabled={false} className="btn btn-warning hidden-first btn-m">Unmute</button>}
        {(!mute && !showJoinRoom) && <button id="muteBtn" onClick={testMute} disabled={false} className="btn btn-warning hidden-first btn-m">Mute</button>}
        {disableLocal && <button id="disableVideoBtn" onClick={testDisableVideo} disabled={false} className="btn btn-danger hidden-first btn-m">Disable/Enable local video</button>}
        {leave && <button id="leaveBtn" onClick={testLeave} disabled={false} className="btn btn-danger hidden-first btn-m">Leave room</button>}
      </div>

      <div id="video-call" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
        {showBackground && <div style={{ width: "100%", padding: "20px", height: "60vh", background: "#424141" }}>
          Met teo
        </div>}
      </div>
    </div>
  )
}

export default Meeting