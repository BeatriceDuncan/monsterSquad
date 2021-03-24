const app = {};

const dndBaseUrl = `https://www.dnd5eapi.co/api/monsters`;

app.getMonsters = (challenge) => {
  $.ajax({
    url: `${dndBaseUrl}?challenge_rating=${challenge}`,
    method: `GET`,
    dataType: `json`,
  }).then((results) => {
    const monsterArray = results.results;
    app.displayMonsters(monsterArray);
  });
};

app.getSelectedValue = () => {
  $(`select`).on(`change`, function (e) {
    e.preventDefault();
    const selection = $(`option:selected`).val();
    $(`.monsterContainer`).empty();
    app.getMonsters(selection);
  });
};

app.displayMonsters = (monsters) => {
  monsters.forEach((monster) => {
    const htmlToAppend = `
            <div class = monsterCard>
                <h3>${monster.name}</h3>
                <a href="https://www.dndbeyond.com/monsters/${monster.index}">About This Monster</a>
            </div>
        `;
    $(`.monsterContainer`).append(htmlToAppend);
  });
};

app.init = function () {
  app.getSelectedValue();
};

$(document).ready(function () {
  app.init();
});
