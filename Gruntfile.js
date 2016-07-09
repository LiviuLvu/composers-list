/*global module:false*/
module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
      // Task configuration.
      browserSync: {
         bsFiles: {
            src: ['js/*.js', 'index.html', 'css/*.css']
         },
         options: {
            server: {
               baseDir: "D:/codingprojects/GitHub/composers-list/"
            }
         }
      }
   });

   // These plugins provide necessary tasks.
   grunt.loadNpmTasks('grunt-browser-sync');

   // Default task.
   grunt.registerTask('default', ['browserSync']);

};
