import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import { AroundYou, Discover, TopArtists, TopCharts } from "./pages";
import { Login } from "./components/Login";

// returns the URL part that coresponds to 'code'
const code = new URLSearchParams(window.location.search).get("code");
const state = new URLSearchParams(window.location.search).get("state");

function App() {
  return (
    <>
      {code ? (
        <div className="relative flex h-[100vh]">
          <Sidebar />
          <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
            SearchBar
            {/* <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse"> */}
            <div className="px-6 h-[calc(100vh-62px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              {/* Main Content */}
              <div className="flex-1 h-fit pb-40">
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-charts" element={<TopCharts />} />
                  <Route path="/around-you" element={<AroundYou />} />
                  {/* <Route path="/artists/:id" element={<ArtistDetails />} /> */}
                  {/* <Route path="/songs/:songKey" element={<SongDetails />} /> */}
                  {/* <Route path="/search/:searchTerm" element={<Search />} /> */}
                </Routes>
              </div>

              {/* Right panel (Top Play, Top Artists) */}
              <div className="xl:sticky relative top-0 h-fit">TopPlay</div>
            </div>
          </div>

          {/* Music Player */}
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            Music Player {"CODE: " + code + " STATE: " + state}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
