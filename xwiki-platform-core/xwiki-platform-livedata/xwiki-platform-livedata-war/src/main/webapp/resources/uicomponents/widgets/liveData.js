/*
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
/*!
#set ($liveDataEntry = 'xwiki-livedata.min')
#set ($liveDataPath = $services.webjars.url('org.xwiki.platform:xwiki-platform-livedata-webjar', $liveDataEntry))
#set ($paths = {
  'js': {
    'xwiki-livedata': $liveDataPath,
    'xwiki-livedata-vue': $services.webjars.url('org.xwiki.platform:xwiki-platform-livedata-webjar',
      'xwiki-livedata-vue.umd.min'),
    'vue': $services.webjars.url('vue', 'vue.min'),
    'vue-i18n': $services.webjars.url('org.webjars.npm:vue-i18n', 'dist/vue-i18n.min'),
    'moment': $services.webjars.url('momentjs', 'min/moment.min'),
    'moment-jdateformatparser': $services.webjars.url('moment-jdateformatparser', 'moment-jdateformatparser.min'),
    'daterangepicker': $services.webjars.url('bootstrap-daterangepicker', 'js/bootstrap-daterangepicker.js'),
    'xwiki-selectize': $xwiki.getSkinFile('uicomponents/suggest/xwiki.selectize.js', true)
  },
  'css': {
    'liveData': $services.webjars.url('org.xwiki.platform:xwiki-platform-livedata-webjar',
      'xwiki-livedata-vue.umd.min.less', {'evaluate': true}),
    'dateRangePicker': $services.webjars.url('bootstrap-daterangepicker', 'css/bootstrap-daterangepicker.css'),
    'selectize': [
      $services.webjars.url('selectize.js', 'css/selectize.bootstrap3.css'),
      $xwiki.getSkinFile('uicomponents/suggest/xwiki.selectize.css', true)
    ]
  },
  'liveDataBasePath': $stringtool.removeEnd($liveDataPath, $liveDataEntry),
  'contextPath': $request.contextPath
})
#[[*/
// Start JavaScript-only code.
(function(paths) {
  "use strict";

  // We have to declare momentjs as a RequireJS package in order to be able to load momentjs locales on demand using
  // RequireJS. See https://github.com/requirejs/requirejs/issues/1554 .
  var momentRelativePath = 'min/moment.min';
  // The base path shouldn't end with the path separator (slash).
  var momentBasePath = paths.js.moment.substring(0, paths.js.moment.length - (momentRelativePath.length + 1));
  // We don't need the path config anymore if we define the package.
  delete paths.js.moment;
  
  require.config({
    packages: [{
      name: 'moment',
      location: momentBasePath,
      main: momentRelativePath
    }],
    paths: paths.js,
    map: {
      '*': {
        'xwiki-livedata-vue': 'xwiki-livedata-vue-with-css',
        daterangepicker: 'daterangepicker-with-css',
        'xwiki-selectize': 'xwiki-selectize-with-css',
        // momentjs locales depend on '../moment' which gets resolved as 'moment/moment' due to our package
        // configuration, which points to the unminified version. The consequence is that we end up loading both the
        // minified and the unminified version of momentjs and, more importantly, the locales are loaded into the moment
        // instance created by the unminified code. In order to fix this we map the unminified version to the minified
        // version so that we work with a single moment instance (that has the locales loaded).
        'moment/moment': 'moment'
      },
      'xwiki-livedata-vue-with-css': {
        'xwiki-livedata-vue': 'xwiki-livedata-vue'
      },
      'daterangepicker-with-css': {
        daterangepicker: 'daterangepicker'
      },
      'xwiki-selectize-with-css': {
        'xwiki-selectize': 'xwiki-selectize'
      }
    },
    config: {
      'xwiki-livedata-source': {
        contextPath: paths.contextPath
      }
    }
  });

  define('loadCSS', function() {
    var loadCSS = function(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    };
  
    return (url) => {
      var urls = Array.isArray(url) ? url : [url];
      urls.forEach(loadCSS);
    };
  });
  
  define('xwiki-livedata-vue-with-css', ['loadCSS', 'xwiki-livedata-vue'], function(loadCSS) {
    // Load the CSS for the live data.
    loadCSS(paths.css.liveData);
    return arguments[1];
  });
  
  define('daterangepicker-with-css', ['loadCSS', 'daterangepicker'], function(loadCSS) {
    // Load the CSS for the date range picker.
    loadCSS(paths.css.dateRangePicker);
    return arguments[1];
  });
  
  define('xwiki-selectize-with-css', ['loadCSS', 'xwiki-selectize'], function(loadCSS) {
    // Load the CSS for the suggest picker.
    loadCSS(paths.css.selectize);
    return arguments[1];
  });
  
  window.liveDataBaseURL = paths.liveDataBasePath;
  
  require(['jquery', 'xwiki-livedata'], function($, LiveData) {
    $.fn.liveData = function(config) {
      return this.each(function() {
        if (!$(this).data('liveData')) {
          var instanceConfig = $.extend($(this).data('config'), config);
          $(this).attr('data-config', JSON.stringify(instanceConfig)).data('liveData', LiveData(this));
        }
      });
    };
  
    var init = function(event, data) {
      var container = $((data && data.elements) || document);
      container.find('.liveData').liveData();
    };
  
    $(document).on('xwiki:dom:updated', init);
    $(init);
  });

// End JavaScript-only code.
}).apply(']]#', $jsontool.serialize([$paths]));
