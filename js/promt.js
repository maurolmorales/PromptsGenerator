export default function (data) {
  const modelNameInput = document.querySelector("#inputNameModel");
  const SceneFrame = document.querySelector("#SceneFrame");
  const SubjectFrame = document.querySelector("#SubjectFrame");
  const Specific_AspectsFrame = document.querySelector("#SpecificAspectsFrame");
  const BackgroundFrame = document.querySelector("#BackgroundFrame");
  const LandscapeAccurateFrame = document.querySelector(
    "#LandscapeAccurateFrame"
  );
  const ArtistsFrame = document.querySelector("#ArtistsFrame");
  const filterArtist = document.querySelector("#filterArtist");
  const CameraFrame = document.querySelector("#CameraFrame");
  const AdditionalFrame = document.querySelector("#AdditionalFrame");
  const inputFinalPromt = document.querySelector("#finalPromt");
  const inputFinalPromtNegative = document.querySelector(
    "#inputFinalPromtNegative"
  );
  const body = document.querySelector("body");
  const copyicon = document.querySelector("#copyicon");
  const copyNegativePromt = document.querySelector("#copyNegativePromt");
  const plantillas = document.querySelector("#plantilla").content;
  const fragment = document.createDocumentFragment();

  const tooltipCopy = (imputObject) => {
    imputObject.classList.add("tooltipCopy");
    console.log("inicio");
    setTimeout(() => {
      console.log("fin");
      imputObject.classList.remove("tooltipCopy");
    }, 2500);
  };

  const generarSelect = (data, destino) => {
    let indice = data;
    let classBefore = plantillas.querySelector("select").className;

    for (const i in indice) {
      if (indice[i].multiple) {
        let divBox = document.createElement("div");
        divBox.classList.add("wrapCheck");
        indice[i].data.forEach((e) => {
          let input = document.createElement("input");
          input.type = "checkbox";
          input.classList.add("boxes");
          if (indice.Person_negative_Promt) {
            input.classList.add(destino.id, "negativePromt");
            input.checked = true;
          } else {
            input.classList.add(destino.id, "positivePromt");
            input.checkedf = false;
          }
          input.value = e;
          let label = document.createElement("label");
          label.classList.add("labelSelect");
          label.innerHTML = e;
          label.appendChild(input);
          divBox.appendChild(label);
          destino.appendChild(divBox);
        });
      } else {
        plantillas.querySelector("label").for = i;
        plantillas.querySelector("label").innerText = i.replaceAll("_", " ");
        plantillas.querySelector("select").name = i;
        plantillas.querySelector("select").id = i;
        plantillas
          .querySelector("select")
          .classList.replace(classBefore, destino.id);
        plantillas.querySelector("select").innerHTML = "";

        const option = document.createElement("option");
        plantillas.querySelector("select").appendChild(option);
        indice[i].data.forEach((e) => {
          const option = document.createElement("option");
          option.value = e;
          option.innerText = e;
          plantillas.querySelector("select").appendChild(option);
        });

        const clone = plantillas.cloneNode(true);
        fragment.appendChild(clone);
        destino.appendChild(fragment);
        classBefore = plantillas.querySelector("select").className;
      }
    }
  };

  const barridoPositivePromt = () => {
    let provisional = "";

    const verifInput = (data) => {
      if (data) {
        if (data.type === "select-one" && data.value && !data.value == "") {
          return data.value;
        }
        if (data.type === "checkbox" && data.checked) {
          return data.value;
        }
      } else {
        return null;
      }
    };

    const verifVowel = (str) => {
      const lowerCaseStr = str.toLowerCase();
      const firstChar = lowerCaseStr.charAt(0);
      return ["a", "e", "i", "o", "u", "h"].includes(firstChar);
    };

    const forSegment = () => {
      let order = "";

      function SceneFrame() {
        let prov = "";

        if (modelNameInput.value) {
          prov += `${modelNameInput.value} `;
        }

        document.querySelectorAll(".SceneFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            prov += s_temp + " ";
          }
        });
        if (prov) {
          order += prov;
        }
      }
      function SubjectFrame() {
        let temp = "";

        document.querySelectorAll(".SubjectFrame").forEach((s) => {
          let s_temp = verifInput(s);
          const DEFAULT = `${s_temp} `;
          const CASES = {
            Dress_Code: `wearing ${s_temp} `,
            Acction: `while ${s_temp} `,
            Pose: verifVowel(String(s_temp))
              ? `in an ${s_temp} `
              : `in a ${s_temp} `,
            Vehicle: verifVowel(String(s_temp))
              ? `an ${s_temp} `
              : `a ${s_temp} `,
          };
          if (s_temp) {
            temp += CASES[s.id] || DEFAULT;
          }
        });
        if (temp) {
          order += `${temp.trim()}, `;
        }
      }
      function SpecificAspectsFrame() {
        let temp = "";
        document.querySelectorAll(".SpecificAspectsFrame").forEach((s) => {
          if (s.value) {
            temp += `${verifInput(s)} `;
          }
        });
        if (temp) {
          order += temp.trim() + ", ";
        }
      }
      function BackgroundFrame() {
        let temp = "";
        document.querySelectorAll(".BackgroundFrame").forEach((b) => {
          if (b.value) {
            temp += verifInput(b) + ", ";
          }
        });
        if (temp) {
          order += temp;
        }
      }
      function LandscapeAccurateFrame() {
        let prov = "";
        document.querySelectorAll(".LandscapeAccurateFrame").forEach((s) => {
          if (s.value) {
            prov += verifInput(s) + ", ";
          }
        });
        if (prov) {
          order += prov;
        }
      }
      function ArtistsFrame() {
        let preArray = [];
        let prov = "";
        document.querySelectorAll(".ArtistsFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            preArray.push(s_temp);
          }
        });

        if (preArray.length > 0) {
          prov += "art by ";
          if (preArray.length > 1) {
            prov += preArray.join(" and ");
          } else {
            prov += preArray[0];
          }

          return (order += `${prov}, `);
        }
      }
      function CameraFrame() {
        let prov = "";
        document.querySelectorAll(".CameraFrame").forEach((s) => {
          if (s.value) {
            prov += verifInput(s) + ", ";
          }
        });
        return (order += prov);
      }
      function AdditionalFrame() {
        let arreglo = [];
        let temp = "";
        document.querySelectorAll(".AdditionalFrame").forEach((s) => {
          let s_temp = verifInput(s);
          if (s_temp) {
            arreglo.push(s_temp);
          }
        });

        if (arreglo.length > 0) {
          temp += arreglo.join(", ");
        }
        if (temp) {
          order += temp;
        }
      }

      SceneFrame();
      SubjectFrame();
      SpecificAspectsFrame();
      BackgroundFrame();
      LandscapeAccurateFrame();
      ArtistsFrame();
      CameraFrame();
      AdditionalFrame();

      provisional = order;
    };
    forSegment();
    return provisional;
  };

  const barridoNegativePromt = () => {
    let temp_negative = "";
    document.querySelectorAll(".negativePromt").forEach((n) => {
      if (n.type === "checkbox" && n.checked === true) {
        temp_negative += `${n.value}, `;
      }
    });
    return temp_negative;
  };

  document.addEventListener("change", () => {
    inputFinalPromt.value = barridoPositivePromt();
    inputFinalPromtNegative.value = barridoNegativePromt();
  });

  copyicon.addEventListener("click", () => {
    let varP = inputFinalPromt.value;
    navigator.clipboard.writeText(varP);
    tooltipCopy(body);
  });

  copyNegativePromt.addEventListener("click", () => {
    let varP = inputFinalPromtNegative.value;
    navigator.clipboard.writeText(varP);
    tooltipCopy(body);
  });

  filterArtist.addEventListener("input", () => {
    let varP = filterArtist.value.toLowerCase().trim();

    document.querySelectorAll("#ArtistsFrame .wrapCheck .labelSelect").forEach((a) => {
      let elementA = a.textContent.toLocaleLowerCase();

      if (elementA.includes(varP)) {
        a.style.display = "flex";
      } else {
        a.style.display = "none";
      }
    });
  });

  generarSelect(data.Scene, SceneFrame);
  generarSelect(data.Subject, SubjectFrame);
  generarSelect(data.Specific_Aspects, Specific_AspectsFrame);
  generarSelect(data.Background, BackgroundFrame);
  generarSelect(data.LandscapeAccurate, LandscapeAccurateFrame);
  generarSelect(data.Artists, ArtistsFrame);
  generarSelect(data.Camera, CameraFrame);
  generarSelect(data.Additional, AdditionalFrame);
  generarSelect(data.Negative_Promt, negativeInput);
}
