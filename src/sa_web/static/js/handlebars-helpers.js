/*global Handlebars _ moment */

var Shareabouts = Shareabouts || {};

(function(NS) {
  Handlebars.registerHelper('STATIC_URL', function() {
    return NS.bootstrapped.staticUrl;
  });

  Handlebars.registerHelper('debug', function(value) {
    if (typeof(value) === typeof({})) {
      return JSON.stringify(value, null, 4);
    } else {
      return value;
    }
  });

  Handlebars.registerHelper('if_equal', function(value1, value2, options) {
    return (value1 === value2) ? options.fn(this) : options.inverse(this);
  });

  // Current user -------------------------------------------------------------

  Handlebars.registerHelper('is_authenticated', function(options) {
    return (NS.bootstrapped && NS.bootstrapped.currentUser) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('current_user', function(attr) {
    return (NS.bootstrapped.currentUser ? NS.bootstrapped.currentUser[attr] : undefined);
  });

  // Date and time ------------------------------------------------------------

  Handlebars.registerHelper('formatdatetime', function(datetime, format) {
    if (datetime) {
      return moment(datetime).format(format);
    }
    return datetime;
  });

  // String -------------------------------------------------------------------

  Handlebars.registerHelper('truncatechars', function(text, maxLength, continuationString) {
    if (_.isUndefined(continuationString) || !_.isString(continuationString)) {
      continuationString = '...';
    }

    if (text && text.length > maxLength) {
      return text.slice(0, maxLength - continuationString.length) + continuationString;
    } else {
      return text;
    }
  });

  Handlebars.registerHelper('is_submitter_name', function(options) {
    return (this.name === 'submitter_name') ? options.fn(this) : options.inverse(this);
  });


  Handlebars.registerHelper('count', function(a, groupBy, val, options) {
    if (groupBy) {
      return _.countBy(a, groupBy)[val] || 0;
    }

    return a.length;
  });

  Handlebars.registerHelper('get_first_type_with_comments', function(options) {
    var order = ['comment-type-correction', 'comment-type-issue', 'comment-type-idea'],
        counts = _.countBy(this.responses, 'comment-type'),
        i, first;

    for (i=0; i<order.length; i++) {
      if (counts[order[i]] > 0) {
        return order[i];
      }
    }

    return order[0];
  });

}(Shareabouts));
