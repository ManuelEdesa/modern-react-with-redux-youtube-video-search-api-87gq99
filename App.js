//componente APP para la api de youtube
import React from 'react';
import youtube from "./components/youtube";
import BarraBusqueda from "./components/BarraBusqueda";
import ListaVideos from "./components/ListaVideos";
import VideoInformacion from "./components/VideoInformacion";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null
  }

  onSearchSubmit = async term => {
    const { data: { items: videos } } = await youtube.get("/search", { params: { q: term } });
    this.setState({ videos, selectedVideo: videos[0] })
  }

  onSelectVideo = selectedVideo => {
    this.setState({ selectedVideo });
  }

  render() {
    const { videos, selectedVideo } = this.state;
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <BarraBusqueda onSubmit={this.onSearchSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column" >
              {selectedVideo && <VideoInformacion video={selectedVideo} />}
            </div>
            <div className="five wide column" >
              <ListaVideos videos={videos} onVideoSelect={this.onSelectVideo} />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default App;
