var Shareabouts = Shareabouts || {};

(function(S, $, console){
  S.SurveyView = Backbone.View.extend({
    events: {
      'submit form': 'onSubmit',
      'click .reply-link': 'onReplyClick'
    },
    initialize: function() {
      S.TemplateHelpers.insertInputTypeFlags(this.options.surveyConfig.items);

      this.collection.on('reset', this.onChange, this);
      this.collection.on('add', this.onChange, this);
    },

    render: function() {
      var self = this,
          responses = [];

      // I don't understand why we need to redelegate the event here, but they
      // are definitely unbound after the first render.
      this.delegateEvents();

      // Responses should be an array of objects with submitter_name,
      // pretty_created_datetime, and items (name, label, and prompt)
      this.collection.each(function(model, i) {
        var items = S.TemplateHelpers.getItemsFromModel(self.options.surveyConfig.items, model, ['submitter_name']);

        responses.push(_.extend(model.toJSON(), {
          submitter_name: model.get('submitter_name') || self.options.surveyConfig.anonymous_name,
          pretty_created_datetime: S.Util.getPrettyDateTime(model.get('created_datetime'),
            self.options.surveyConfig.pretty_datetime_format),
          items: items,
        }));
      });

      this.$el.html(Handlebars.templates['place-detail-survey']({
        responses: responses,
        has_single_response: (responses.length === 1),
        survey_config: this.options.surveyConfig,
        place: this.collection.options.placeModel.toJSON()
      }));

      return this;
    },

    remove: function() {
      this.unbind();
      this.$el.remove();
    },

    onChange: function() {
      this.render();
    },

    onSubmit: function(evt) {
      evt.preventDefault();
      var self = this,
          submissionType = this.collection.options.submissionType,
          $form = this.$('form'),
          $button = this.$('[name="commit"]'),
          attrs = S.Util.getAttrs($form);

      // Disable the submit button until we're done, so that the user doesn't
      // over-click it
      $button.attr('disabled', 'disabled');

      // Create a model with the attributes from the form
      this.collection.create(attrs, {
        wait: true,
        success: function() {
          var submissionSets = self.collection.options.placeModel.get('submission_sets');

          if (!submissionSets[submissionType]) {
            // Not adding the url since it is not needed for rendering anything
            submissionSets[submissionType] = {};
          }
          submissionSets[submissionType].length = self.collection.size();

          self.collection.options.placeModel.set('submission_sets', submissionSets);
          self.collection.options.placeModel.trigger('change change:submission_sets');

          // Clear the form
          $form.get(0).reset();
        },
        complete: function() {
          // No matter what, enable the button
          $button.removeAttr('disabled');
        }
      });
    },

    onReplyClick: function(evt) {
      evt.preventDefault();
      this.$('textarea, input').not('[type="hidden"]').first().focus();
    }

  });

})(Shareabouts, jQuery, Shareabouts.Util.console);
