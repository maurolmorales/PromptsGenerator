import "./css/estilos.css";
import copyIcon from "./public/copyIcon.svg";
import data from "./js/promts.json";
import promptJS from "./js/promt.js";

document.querySelector("#app").innerHTML = `
  <header>
    <h1>
      <p>Prompts</p>
      <p>Generator</p>
    </h1>
    <div>
      <img
        src="${copyIcon}"
        alt="copy icon"
        id="copyicon"
      />
      <textarea cols="30" rows="10" id="finalPromt"></textarea>
      <!-- <input type="text" id="finalPromt"> -->
    </div>
  </header>
  <main>
    <section>
      <h2>Scene Descriptions</h2>
      <article id="SceneFrame">
        <div>
          <label for="inputNameModel">Model Name</label>
          <input
            type="text"
            id="inputNameModel"
            class="positivePromt"
            placeholder="-- Insert Model --"
          />
        </div>
      </article>
    </section>
    <section>
      <h2>Subject</h2>
      <article id="SubjectFrame"></article>
    </section>
    <section>
      <h2>specific Aspects</h2>
      <article id="SpecificAspectsFrame"></article>
    </section>
    <section>
      <h2>Background</h2>
      <article id="BackgroundFrame"></article>
    </section>
    <section>
      <h2>LandscapeAccurate</h2>
      <article id="LandscapeAccurateFrame"></article>
    </section>
    <section class="Artists">
      <h2>Artists</h2>
      <div class="filterArtistBox">
          <input
            type="text"
            id="filterArtist"
            class="positivePromt"
            placeholder="word word ..."
          />
        </div>
      <article id="ArtistsFrame">
      </article>
    </section>
    <section>
      <h2>Camera</h2>
      <article id="CameraFrame"></article>
    </section>
    <section>
      <h2>Additional</h2>
      <article id="AdditionalFrame"></article>
    </section>
    <section>
      <h2>Negative Promts</h2>
      <article id="negativeInput"></article>
    </section>
    <footer>
      <div>
        <img
          src="${copyIcon}"
          alt="copy icon"
          id="copyNegativePromt"
        />
        <input type="text" id="inputFinalPromtNegative" />
      </div>
    </footer>
  </main>
`;

promptJS(data);
