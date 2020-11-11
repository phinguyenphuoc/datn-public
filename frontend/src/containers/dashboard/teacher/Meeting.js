import React, { useEffect, useRef, useState } from "react"
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify";
import {
  ModalZoomSuccess,
} from "../../../components/dashboard/teacher/profile";
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
const client = new window.StringeeClient();
let currentCall = null

function Meeting(props) {
  const localVideo = useRef(null)
  const remoteVideo = useRef(null)
  const connect = async () => {
    const access_token = await getAccessToken();
    client.connect(access_token);
  }

  const [showCallBtn, setShowCallBtn] = useState(true);
  const [showAnswerBtn, setShowAnswerBtn] = useState(false);
  const [showRejectBtn, setShowRejectBtn] = useState(false);
  const [showEndBtn, setShowEndBtn] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [showSwitchCameraBtn, setShowSwitchCameraBtn] = useState(false)
  const [connectStatus, setConnectStatus] = useState(false)

  const resetButton = () => {
    setShowCallBtn(true)
    setShowAnswerBtn(false)
    setShowRejectBtn(false)
    setShowEndBtn(false)
    setShowSwitchCameraBtn(false)
  }

  useEffect(() => {
    client.on('connect', function () {
      console.log('connected');
    });

    client.on('authen', function (res) {
      console.log('authenticated', res);
      setConnectStatus(true)
    });

    client.on('disconnect', function () {
      console.log('disconnected');
    });

    client.on('incomingcall', function (incomingcall) {
      console.log('incomingcall', incomingcall);
      setShowAnswerBtn(true)
      setShowRejectBtn(true)
      currentCall = incomingcall;
      settingCallEvent(currentCall);
    });

    connect();
  }, [])

  function settingCallEvent(call1) {
    call1.on('addremotestream', function (stream) {
      // reset srcObject to work around minor bugs in Chrome and Edge.
      console.log('addremotestream');
      remoteVideo.current.srcObject = null;
      remoteVideo.current.srcObject = stream;
    });

    call1.on('addlocalstream', function (stream) {
      // reset srcObject to work around minor bugs in Chrome and Edge.
      console.log('addlocalstream');
      localVideo.current.srcObject = null;
      localVideo.current.srcObject = stream;

      setShowEndBtn(true)
      setShowCallBtn(false)
    });

    call1.on('signalingstate', function (state) {
      console.log('signalingstate ', state);

      if (state.code === 6 || state.code === 5)//end call or callee rejected
      {
        localVideo.current.srcObject = null;
        remoteVideo.current.srcObject = null;
        resetButton()
      }
    });

    call1.on('mediastate', function (state) {
      console.log('mediastate ', state);
    });

    call1.on('info', function (info) {
      console.log('on info:' + JSON.stringify(info));
    });
  }

  const videoCall = () => {
    currentCall = new window.StringeeCall(client, "08e49433-17be-4905-bec1-6d87c5da4d6a", "c00150bd-4bc6-4149-818e-3f8c8fe30aff", true);
    settingCallEvent(currentCall);
    currentCall.makeCall(function (res) {
      console.log('+++ call callback: ', res);
      if (res.message === 'SUCCESS') {
        console.log("call success")
        setShowSwitchCameraBtn(true)
      }
    });
  }

  const answerVideoCall = () => {
    console.log('current call ', currentCall, typeof currentCall);
    if (currentCall != null) {
      currentCall.answer(function (res) {
        console.log('+++ answering call: ', res);
        setShowEndBtn(true)
        setShowAnswerBtn(false)
        setShowRejectBtn(false)
        setShowCallBtn(false)
        setShowSwitchCameraBtn(true)
      });
    }
  }

  const endCall = () => {
    if (currentCall != null) {
      currentCall.hangup(function (res) {
        console.log('+++ hangup: ', res);
        resetButton()
      });
    }
  }
  const enableLocalVideo = () => {
    let success
    if (currentCall.localVideoEnabled) {
      success = currentCall.enableLocalVideo(false);
    } else {
      success = currentCall.enableLocalVideo(true);
    }
    console.log("tat camera", success)
  }
  // console.log(fullScreen)
  return (
    <>
      <ModalZoomSuccess
        isOpen={connectStatus}
        handleToggle={() => setConnectStatus(false)}
      />
      <div className={fullScreen ? "video-container-full" : "video-container"}>
        <video id="localVideo" className="_localVideo" ref={localVideo} autoPlay={true} muted style={{ background: "#333" }}></video>
        <video id="remoteVideo" className="_remoteVideo" ref={remoteVideo} autoPlay={true} style={{ background: "#dee" }}></video>
        <div className="video-button" id="action-buttons">
          {showCallBtn && <button id="callButton" className="btn btn-success btn-m" onClick={videoCall}>Call</button>}
          {showAnswerBtn && <button id="answerCallButton" className="btn btn-info hidden-first btn-m" onClick={answerVideoCall}>Answer Call</button>}
          {showRejectBtn && <button id="rejectCallButton" className="btn btn-warning hidden-first btn-m">Reject Call</button>}
          {showEndBtn && <button id="endCallButton" className="btn btn-danger hidden-first btn-m" onClick={endCall}>End Call</button>}
          {showSwitchCameraBtn && <button id="endCallButton" className="btn btn-danger hidden-first btn-m" onClick={enableLocalVideo}>Turn on/Turn off camera</button>}
          <button id="endCallButton" className="btn btn-danger hidden-first btn-m" onClick={() => setFullScreen(!fullScreen)}>{fullScreen ? "Minimize" : "Full Screen"}</button>
        </div>
      </div>
    </>
  )
}

export default Meeting