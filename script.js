//<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
const padObj = [{ key: 'Q', keyCode: 81, url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", text: 'TestTextQ' }, { key: 'W', keyCode: 87, url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3", text: 'TestTextW' }, { key: 'E', keyCode: 69, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Rides/87[kb]cleanride.aif.mp3", text: 'TestTextE' }, { key: 'A', keyCode: 65, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/26[kb]clapsnare.aif.mp3", text: 'TestTextA' }, { key: 'S', keyCode: 83, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/34[kb]brightclap.aif.mp3", text: 'TestTextS' }, { key: 'D', keyCode: 68, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/27[kb]ec-hat040.wav.mp3", text: 'TestTextD' }, { key: 'Z', keyCode: 90, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/61[kb]bunchakiks18.wav.mp3", text: 'TestTextZ' }, { key: 'X', keyCode: 88, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/67[kb]808sub.aif.mp3", text: 'TestTextX' }, { key: 'C', keyCode: 67, url: "https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/39[kb]707-ohh.aif.mp3", text: 'TestTextC' }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: 'Default',
      drumKit: padObj };

    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(sampleText) {
    this.setState({
      displayText: sampleText });

  }

  componentDidMount() {
    document.addEventListener("keydown", event => {
      let codes = [81, 87, 69, 65, 83, 68, 90, 88, 67];
      if (codes.indexOf(event.keyCode) > -1) {
        document.getElementById("key" + event.keyCode).click();
      }
    });
  }

  render() {
    return (
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "display" }, this.state.displayText),
      React.createElement(Drumpad, { padSet: this.state.drumKit, updateDisplay: this.changeDisplay }),
      React.createElement("div", { id: "footer" }, "Drum Machine for freecodecamp.org", React.createElement("br", null), " - by Abhijith Preshobhan")));


  }}


class Drumpad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pad = this.props.padSet.map(obj => {
      return (
        React.createElement(DrumKey, { btnKey: "key" + obj.keyCode, audKey: obj.key, audSrc: obj.url, updateDisplay: this.props.updateDisplay, keyText: obj.text }));

    });
    return (
      React.createElement("div", null, pad));

  }}


class DrumKey extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    let sample = document.getElementById(this.props.audKey);
    sample.currentTime = 0;
    sample.play();
    this.props.updateDisplay(this.props.keyText);
  }
  render() {
    return (
      React.createElement("button", { className: "drum-pad", id: this.props.btnKey, onClick: this.handleClick }, this.props.audKey, React.createElement("audio", { className: "clip", id: this.props.audKey, src: this.props.audSrc, type: "audio/mpeg" })));

  }}


ReactDOM.render(React.createElement(App, null), document.getElementById('root'));