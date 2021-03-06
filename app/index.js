'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var DuniqueBootstrapGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.jsBootstrap = true;
    this.fontawesome = true;

    // setup the test-framework property, Gruntfile template will need this
    this.testFramework = this.options['test-framework'] || 'mocha';

    // for hooks to resolve on mocha by default
    if (!this.options['test-framework']) {
      this.options['test-framework'] = 'mocha';
    }
    // resolved to mocha by default (could be switched to jasmine for instance)
    //this.hookFor('test-framework', { as: 'app' });

    this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
    this.mainJsFile = '';

    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Dunique Bootstrap generator.'));

    /*var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));*/
    done();
  },

  gruntfile: function () {
    this.template('Gruntfile.js');
  },

  packageJSON: function () {
    this.template('_package.json', 'package.json');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('gitattributes', '.gitattributes');
  },

  bower: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
  },

  jshint: function () {
    this.copy('jshintrc', '.jshintrc');
  },

  editorConfig: function () {
    this.copy('editorconfig', '.editorconfig');
  },

  h5bp: function () {
    this.copy('favicon.ico', 'app/favicon.ico');
    this.copy('404.html', 'app/404.html');
    this.copy('robots.txt', 'app/robots.txt');
    this.copy('htaccess', 'app/.htaccess');
  },

  /* mainStylesheet: function () {
    var html = '@import "../bower_components/bootstrap/less/bootstrap.less";\n@icon-font-path: "../fonts/glyphicons/";\n\n';

    html = html + '@import "../bower_components/font-awesome/less/font-awesome.less";\n@fa-font-path: "../fonts/font-awesome";\n\n';

    html = html + '@import "../bower_components/snapjs/snap.css";\n\n'

    html = html + '@import "vendor/r_default.less";\n\n';

    html = html + '.browsehappy {\n  margin: 0.2em 0; \n  background: #ccc; \n  color: #000; \n  padding: 0.2em 0; \n}\n\n';
    html = html + '.jumbotron {\n  margin: 50px auto 0 auto;\n}';

    this.write('app/styles/main.less', html);

    this.copy('vendor_css/fonts.less', 'app/styles/vendor/fonts.less');
    this.copy('vendor_css/r_custom_forms.less', 'app/styles/vendor/r_custom_forms.less');
    this.copy('vendor_css/r_default.less', 'app/styles/vendor/r_default.less');
    this.copy('vendor_css/r_mixins.less', 'app/styles/vendor/r_mixins.less');
    this.copy('vendor_css/typography.less', 'app/styles/vendor/typography.less');
  },*/

  /*writeIndex: function () {

    this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', [
      'bower_components/jquery/jquery.js',
      'bower_components/snapjs/snap.js',
      'scripts/main.js'
    ]);

    // wire Bootstrap plugins
    this.indexFile = this.appendScripts(this.indexFile, 'scripts/vendor/bootstrap.js', [
      'bower_components/bootstrap/js/affix.js',
      'bower_components/bootstrap/js/alert.js',
      'bower_components/bootstrap/js/dropdown.js',
      'bower_components/bootstrap/js/tooltip.js',
      'bower_components/bootstrap/js/modal.js',
      'bower_components/bootstrap/js/transition.js',
      'bower_components/bootstrap/js/button.js',
      'bower_components/bootstrap/js/popover.js',
      'bower_components/bootstrap/js/carousel.js',
      'bower_components/bootstrap/js/scrollspy.js',
      'bower_components/bootstrap/js/collapse.js',
      'bower_components/bootstrap/js/tab.js'
    ]);
    // append the default content
    //this.indexFile = this.indexFile.replace('<body>', '<body>\n' + contentText.join('\n'));
  },*/

  app: function () {
    //create the dirs
    this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/styles/vendor');
    this.mkdir('app/images');
    this.mkdir('app/images/touch');

    //move files
    this.copy('styles/config.less', 'app/styles/vendor/config.less');
    this.copy('styles/default.less', 'app/styles/vendor/default.less');
    this.copy('styles/main.less', 'app/styles/main.less');
    this.copy('styles/typography.less', 'app/styles/vendor/typography.less');
    this.copy('scripts/main.js', 'app/scripts/main.js');
    this.copy('images/touch/apple-touch-icon-114x114-precomposed.png', 'app/images/touch/apple-touch-icon-114x114-precomposed.png');
    this.copy('images/touch/apple-touch-icon-144x144-precomposed.png', 'app/images/touch/apple-touch-icon-144x144-precomposed.png');
    this.copy('images/touch/apple-touch-icon-57x57-precomposed.png', 'app/images/touch/apple-touch-icon-57x57-precomposed.png');
    this.copy('images/touch/apple-touch-icon-72x72-precomposed.png', 'app/images/touch/apple-touch-icon-72x72-precomposed.png');

    //write index.html
    this.write('app/index.html', this.indexFile);
    //this.write('app/scripts/hello.coffee', this.mainCoffeeFile);
    //this.write('app/scripts/main.js', this.mainJsFile);
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = DuniqueBootstrapGenerator;