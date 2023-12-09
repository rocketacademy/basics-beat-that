var Haikurray = [
  "Arise from sleep, old cat, And with great yawns and stretchings... Amble out for love ― Issa",
  "All Heaven and Earth Flowered white obliterate...Snow...unceasing snow - Hashin",
  "April's air stirs in Willow-leaves...a butterfly Floats and balances― Bashō",
  "Many solemn nights Blond moon, we stand and marvel... Sleeping our noons  way ― Teitoku",
  "Dead my old fine hopes And dry my dreaming but still...Iris, blue each spring ― Shushiki",
  "In the city fields Contemplating cherry-trees...Strangers are like friends ― Issa",
  "Many solemn nights Blond moon, we stand and marvel... Sleeping our noons away ― Teitoku",
  "Dead my old fine hopes And dry my dreaming but still... Iris, blue each  Spring ― Shushiki",
  "Dew Evaporates And all our world is dew...so dear, So fresh, so fleeting ― Issa",
  "Mountain-rose petals Falling, falling, falling now... Waterfall music ― Bashō",
  "Describe plum-blossoms? Better than my verses...white Wordless Butterflies ― Reikan",
  "Don't touch my plumtree! Said my friend and saying so... Broke the branch for me ― Taigi",
];

var HaiKuGen = function () {
  return "<u>Haiku Generator</u><br>" + Haikurray[randNum()];
};

function randNum() {
  return Math.floor(Math.random() * Haikurray.length);
}
