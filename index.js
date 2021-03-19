import puppeteer from "puppeteer";
const URL = "https://pokemondb.net/pokedex/national#gen-1";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on("console", (consoleObj) => console.log(consoleObj.text()));

  await page.goto(URL);

  let list = await page.evaluate(() => {
    let generations = document.querySelectorAll(".infocard-list")[0];
    // generations = [...generations];

    let pokemons = generations.querySelectorAll(".infocard");
    pokemons = [...pokemons];

    
    return pokemons.filter((e) => {
      if(!e.querySelector('img')){
      }
      return {
        name: e.querySelector(".ent-name").innerText,
        href: e.querySelector(".ent-name").getAttribute("href"),
        image: e.querySelector("img").getAttribute("src"),
        id: e.querySelector('.infocard-lg-data.text-muted > small').innerText,
      };
    });
    console.log(list);
  });
  console.log(list);
  await browser.close();
};

main();
