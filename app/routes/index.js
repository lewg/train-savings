/*global Ember */
import RouteMetaMixin from 'ember-cli-meta-tags/mixins/route-meta';

export default Ember.Route.extend(RouteMetaMixin, {
  meta: function() {
    return {
      'property': {
        'fb:app_id': 938073002923400,
        'og:title': 'Does taking the train save you money?',
        'og:sitename': 'Train Savings',
        'og:url': 'https://trainsavings.goettner.net',
        'og:description': 'A simple tool for calculating the difference in price between taking the train to work, and driving.',
        'og:image': '/assets/images/facebook-image.jpg',
        'og:image:width': 1200,
        'og:image:height': 630
      },
      'name': {
        'twitter:image': '/assets/images/twitter-card.jpg',
        'twitter:card': 'summary_large_image',
        'twitter:creator': '@lewg',
        'twitter:title': 'Train Savings',
        'twitter:description': 'A simple tool for calculating the difference in price between taking the train to work, and driving.',
      }
    };
  },
  model: function() {
    return {
      work: {
        weeks: 46,
        miles_away: 40,
        parking_frequency: "Monthly",
        parking_cost: 165
      },
      vehicle: {
        miles_per_gallon: 14,
        gas_cost_per_gallon: 2.80,
        oil_change_cost: 50,
        oil_change_miles: 3000,
      },
      train: {
        pass_frequency: "Monthly",
        pass_cost: 181,
        parking_frequency: "Daily",
        parking_cost: 1,
        miles_to_station: 5,
      },
    };
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
