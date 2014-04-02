var expect = require("expect.js");
var proxyquire = require("proxyquire").noCallThru();

describe("java", function() {
  var java;
  var utilStub = {};
  var cpStub = {};
  var fsStub = {};

  describe("#checkVersion()", function() {
    beforeEach(function(done) {
      java = proxyquire("../../lib/manager/java.js", {
        "./utils.js": utilStub,
        "child_process": cpStub,
        "fs": fsStub
      });

      utilStub.normalizeExePath = function(path) {};
      done();
    });

    it("should pass null to callback when an error occurs.", function(done) {
      cpStub.exec = function(cmd, options, callback) {
        callback({code: 1}, {}, {});
      };

      java.checkVersion("/some/path/to/a/java/installation", function(version) {
        expect(version).to.be(null);
        done();
      });
    });

    it("should continue normally if error.code = 0.", function(done) {
      cpStub.exec = function(cmd, options, callback) {
        callback({code: 0}, {}, {
          toString: function() {
            return "java version \"1.8.0\"";
          }
        });
      };
      java.checkVersion("/some/path/to/a/java/installation", function(version) {
        expect(version).to.be("1.8.0");
        done();
      });
    });

    it("should properly parse the version.", function(done) {
      cpStub.exec = function(cmd, options, callback) {
        callback(null, {}, {
          toString: function() {
            return "java version \"1.8.0\"";
          }
        });
      };
      java.checkVersion("/some/path/to/a/java/installation", function(version) {
        expect(version).to.be("1.8.0");
        done();
      });
    });
  });
});