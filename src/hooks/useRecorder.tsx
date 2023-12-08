import Recorder from 'recorder-js'

export const useRecorder = () => {
  const audioContext = new window.AudioContext()

  const recorder = new Recorder(audioContext, {
    // An array of 255 Numbers
    // You can use this to visualize the audio stream
    // If you use react, check out react-wave-stream
  })

  let isRecording = false
  const blob = null

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => recorder.init(stream))
    .catch((err) => console.log('Uh oh... unable to get stream...', err))

  function startRecording() {
    recorder
      .start()
      .then(() => (isRecording = true))
      .catch((err) => console.log(err))
  }

  function stopRecording() {
    recorder
      .stop()
      .then(({ blob, buffer }) => {
        blob = blob

        // buffer is an AudioBuffer
      })
      .catch((err) => console.log(err))
  }

  function download() {
    Recorder.download(blob as unknown as Blob, 'my-audio-file') // downloads a .wav file
  }

  const ReturningAudio = () => {
    return (
      <div>
        <audio src={blob || ''} controls />
      </div>
    )
  }

  return {
    startRecording,
    stopRecording,
    download,
    ReturningAudio,
    isRecording
  }
}
