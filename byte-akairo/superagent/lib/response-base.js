"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1iYXNlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJSZXNwb25zZUJhc2UiLCJvYmoiLCJtaXhpbiIsImtleSIsInByb3RvdHlwZSIsIk9iamVjdCIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImdldCIsImZpZWxkIiwiaGVhZGVyIiwidG9Mb3dlckNhc2UiLCJfc2V0SGVhZGVyUHJvcGVydGllcyIsImN0IiwidHlwZSIsInBhcmFtcyIsImxpbmtzIiwibGluayIsInBhcnNlTGlua3MiLCJfc2V0U3RhdHVzUHJvcGVydGllcyIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJzdGF0dXNUeXBlIiwiaW5mbyIsIm9rIiwicmVkaXJlY3QiLCJjbGllbnRFcnJvciIsInNlcnZlckVycm9yIiwiZXJyb3IiLCJ0b0Vycm9yIiwiY3JlYXRlZCIsImFjY2VwdGVkIiwibm9Db250ZW50IiwiYmFkUmVxdWVzdCIsInVuYXV0aG9yaXplZCIsIm5vdEFjY2VwdGFibGUiLCJmb3JiaWRkZW4iLCJub3RGb3VuZCIsInVucHJvY2Vzc2FibGVFbnRpdHkiXSwibWFwcGluZ3MiOiI7O0FBQUE7OztBQUlBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7QUFFQTs7Ozs7QUFJQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxZQUFqQjtBQUVBOzs7Ozs7QUFNQSxTQUFTQSxZQUFULENBQXNCQyxHQUF0QixFQUEyQjtBQUN6QixNQUFJQSxHQUFKLEVBQVMsT0FBT0MsS0FBSyxDQUFDRCxHQUFELENBQVo7QUFDVjtBQUVEOzs7Ozs7Ozs7QUFRQSxTQUFTQyxLQUFULENBQWVELEdBQWYsRUFBb0I7QUFDbEIsT0FBSyxJQUFNRSxHQUFYLElBQWtCSCxZQUFZLENBQUNJLFNBQS9CLEVBQTBDO0FBQ3hDLFFBQUlDLE1BQU0sQ0FBQ0QsU0FBUCxDQUFpQkUsY0FBakIsQ0FBZ0NDLElBQWhDLENBQXFD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LEdBQTJCbEIsTUFBTSxLQUFLLEdBQXRDO0FBQ0QsQ0ExQkQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoUmVzcG9uc2VCYXNlLnByb3RvdHlwZSwga2V5KSlcbiAgICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKSB7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZUJhc2UucHJvdG90eXBlLl9zZXRIZWFkZXJQcm9wZXJ0aWVzID0gZnVuY3Rpb24oaGVhZGVyKSB7XG4gIC8vIFRPRE86IG1vYXIhXG4gIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAvLyBjb250ZW50LXR5cGVcbiAgY29uc3QgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB1dGlscy50eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgY29uc3QgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgZm9yIChjb25zdCBrZXkgaW4gcGFyYW1zKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChwYXJhbXMsIGtleSkpXG4gICAgICB0aGlzW2tleV0gPSBwYXJhbXNba2V5XTtcbiAgfVxuXG4gIHRoaXMubGlua3MgPSB7fTtcblxuICAvLyBsaW5rc1xuICB0cnkge1xuICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgIH1cbiAgfSBjYXRjaCB7XG4gICAgLy8gaWdub3JlXG4gIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cykge1xuICBjb25zdCB0eXBlID0gKHN0YXR1cyAvIDEwMCkgfCAwO1xuXG4gIC8vIHN0YXR1cyAvIGNsYXNzXG4gIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXMgPSB0aGlzLnN0YXR1c0NvZGU7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IHR5cGUgPT09IDE7XG4gIHRoaXMub2sgPSB0eXBlID09PSAyO1xuICB0aGlzLnJlZGlyZWN0ID0gdHlwZSA9PT0gMztcbiAgdGhpcy5jbGllbnRFcnJvciA9IHR5cGUgPT09IDQ7XG4gIHRoaXMuc2VydmVyRXJyb3IgPSB0eXBlID09PSA1O1xuICB0aGlzLmVycm9yID0gdHlwZSA9PT0gNCB8fCB0eXBlID09PSA1ID8gdGhpcy50b0Vycm9yKCkgOiBmYWxzZTtcblxuICAvLyBzdWdhclxuICB0aGlzLmNyZWF0ZWQgPSBzdGF0dXMgPT09IDIwMTtcbiAgdGhpcy5hY2NlcHRlZCA9IHN0YXR1cyA9PT0gMjAyO1xuICB0aGlzLm5vQ29udGVudCA9IHN0YXR1cyA9PT0gMjA0O1xuICB0aGlzLmJhZFJlcXVlc3QgPSBzdGF0dXMgPT09IDQwMDtcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSBzdGF0dXMgPT09IDQwMTtcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gc3RhdHVzID09PSA0MDY7XG4gIHRoaXMuZm9yYmlkZGVuID0gc3RhdHVzID09PSA0MDM7XG4gIHRoaXMubm90Rm91bmQgPSBzdGF0dXMgPT09IDQwNDtcbiAgdGhpcy51bnByb2Nlc3NhYmxlRW50aXR5ID0gc3RhdHVzID09PSA0MjI7XG59O1xuIl19