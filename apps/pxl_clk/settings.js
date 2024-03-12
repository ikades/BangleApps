(function(back) {
  var FILE = "pxl_clk.json";

  // Initialize with default settings...
  let s = {'bg': '#0ff', 'color': 'Cyan', 'd_or_i':'date', 'showlock':true};

  const storage = require('Storage');
  let settings = storage.readJSON(FILE, 1) || s;
  const saved = settings || {};
  for (const key in saved) {
    s[key] = saved[key];
  }

  function writeSettings() {
    settings = s;
    require('Storage').writeJSON(FILE, settings);
  }

  var color_options = ['Green','Orange','Cyan','Purple','Red','Blue'];
  var bg_code = ['#0f0','#ff0','#0ff','#f0f','#f00','#00f'];
  var doir = ['date','3rd info'];

  // Show the menu
  E.showMenu({
    "" : { "title" : "Pixel Clock" },
    "< Back" : () => back(),
    /*LANG*/'Colour': {
      value: 0 | color_options.indexOf(s.color),
      min: 0, max: 5,
      format: v => color_options[v],
      onchange: v => {
        s.color = color_options[v];
        s.bg = bg_code[v];
        writeSettings();
      }
    },
    /*LANG*/'Date or info': {
      value: 0 | doir.indexOf(s.d_or_i),
      min: 0, max: 1,
      format: v => doir[v],
      onchange: v => {
        s.d_or_i = doir[v];
        writeSettings();
      }
    },
    /*LANG*/'Show Lock': {
      value: settings.showlock,
      onchange: () => {
        settings.showlock = !settings.showlock;
        save();
      }
    },
  });
});