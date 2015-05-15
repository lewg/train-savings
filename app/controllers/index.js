import periodic from '../utils/periodic';
import numeral from 'numeral';

/*global Ember */
export default Ember.Controller.extend({
  frequency: [ 'Annual', 'Monthly', 'Weekly', 'Daily' ],

  gasPriceFmt: function() {
    return numeral(this.get('model.vehicle.gas_cost_per_gallon')).format('0.00');
  }.property('model.vehicle.gas_cost_per_gallon'),

  trainVehicleDistance: function() {
    return this.get('model.train.miles_to_station') * 10 * this.get('model.work.weeks');
  }.property('model.train.miles_to_station', 'model.work.weeks'),

  trainVehicleDistanceFmt: function() {
    return numeral(this.get('trainVehicleDistance')).format('0,0');
  }.property('trainVehicleDistance'),

  trainVehicleGasUsed: function() {
    return this.get('trainVehicleDistance') / this.get('model.vehicle.miles_per_gallon');
  }.property('model.vehicle.mpg', 'trainVehicleDistance'),

  trainVehicleGasCost: function() {
    return this.get('trainVehicleGasUsed') * this.get('model.vehicle.gas_cost_per_gallon');
  }.property('model.vehicle.gas_cost_per_gallon', 'trainVehicleGasUsed'),

  trainVehicleGasCostFmt: function() {
    return numeral(this.get('trainVehicleGasCost')).format('0,0');
  }.property('trainVehicleGasCost'),

  trainVehicleOilChanges: function() {
    return Math.floor(this.get('trainVehicleDistance') / this.get('model.vehicle.oil_change_miles'));
  }.property('model.vehicle.oil_change_miles', 'trainVehicleDistance'),

  trainVehicleOilCost: function() {
    return this.get('trainVehicleOilChanges') * this.get('model.vehicle.oil_change_cost');
  }.property('model.vehicle.oil_change_cost', 'trainVehicleOilChanges'),

  trainPassCost: function() {
    return periodic(
      this.get('model.train.pass_frequency'),
      this.get('model.train.pass_cost'),
      this.get('model.work.weeks')
    );
  }.property('model.train.pass_frequency', 'model.train.pass_cost', 'model.work.weeks'),

  trainPassCostFmt: function() {
    return numeral(this.get('trainPassCost')).format('0,0');
  }.property('trainPassCost'),

  trainParkCost: function() {
    return periodic(
      this.get('model.train.parking_frequency'),
      this.get('model.train.parking_cost'),
      this.get('model.work.weeks')
    );
  }.property('model.train.parking_frequency', 'model.train.parking_cost', 'model.work.weeks'),

  trainCost: function() {
    return this.get('trainPassCost') + this.get('trainParkCost') +
      this.get('trainVehicleGasCost') + this.get('trainVehicleOilCost');
  }.property('trainPassCost','trainParkCost','trainVehicleGasCost','trainVehicleOilCost'),

  trainCostFmt: function() {
    return numeral(this.get('trainCost')).format('0,0');
  }.property('trainCost'),

  drivingDistance: function() {
    return this.get('model.work.miles_away') * 10 * this.get('model.work.weeks');
  }.property('model.work.miles_away', 'model.work.weeks'),

  drivingDistanceFmt: function() {
    return numeral(this.get('drivingDistance')).format('0,0');
  }.property('drivingDistance'),

  drivingGasUsed: function() {
    return this.get('drivingDistance') / this.get('model.vehicle.miles_per_gallon');
  }.property('model.vehicle.miles_per_gallon', 'drivingDistance'),

  drivingGasUsedFmt: function() {
    return numeral(this.get('drivingGasUsed')).format('0,0');
  }.property('drivingGasUsed'),

  drivingGasCost: function() {
    return this.get('drivingGasUsed') * this.get('model.vehicle.gas_cost_per_gallon');
  }.property('model.vehicle.gas_cost_per_gallon', 'drivingGasUsed'),

  drivingGasCostFmt: function() {
    return numeral(this.get('drivingGasCost')).format('0,0');
  }.property('drivingGasCost'),


  drivingOilChanges: function() {
    return Math.floor(this.get('drivingDistance') / this.get('model.vehicle.oil_change_miles'));
  }.property('model.vehicle.oil_change_miles', 'drivingDistance'),

  drivingOilCost: function() {
    return this.get('drivingOilChanges') * this.get('model.vehicle.oil_change_cost');
  }.property('model.vehicle.oil_change_cost', 'drivingOilChanges'),

  drivingOilCostFmt: function() {
    return numeral(this.get('drivingOilCost')).format('0,0');
  }.property('drivingOilCost'),

  drivingParkCost: function() {
    return periodic(
      this.get('model.work.parking_frequency'),
      this.get('model.work.parking_cost'),
      this.get('model.work.weeks')
    );
  }.property('model.work.parking_frequency', 'model.work.parking_cost', 'model.work.weeks'),

  drivingParkCostFmt: function() {
    return numeral(this.get('drivingParkCost')).format('0,0');
  }.property('drivingParkCost'),

  drivingCost: function() {
    return this.get('drivingGasCost') + this.get('drivingOilCost') + this.get('drivingParkCost');
  }.property('drivingGasCost', 'drivingOilCost', 'drivingParkCost'),

  drivingCostFmt: function() {
    return numeral(this.get('drivingCost')).format('0,0');
  }.property('drivingCost'),

  trainSavings: function() {
    var savings = this.get('drivingCost') - this.get('trainCost');
    return savings;
  }.property('trainCost', 'drivingCost'),

  trainSavingsFmt: function() {
    return numeral(this.get('trainSavings')).format('0,0');
  }.property('trainSavings'),

  hasTrainSavings: function() {
    return (this.get('trainSavings') >= 0) ? true : false;
  }.property('trainSavings'),

  negativeTrainSavingsFmt: function() {
    return numeral(0 - this.get('trainSavings')).format('0,0');
  }.property('trainSavings'),

  tweetURL: function() {
    var url = "https://twitter.com/intent/tweet?";
    if (this.get('hasTrainSavings')) {
      var savings = "Looks like I save $" + this.get('trainSavingsFmt') + " a year taking the train over driving. Find out if you can too: ";
      url = url + "&text=" + encodeURIComponent(savings);
    } else {
      var regret = "Unfortunately, taking the train is costing me $" + this.get('negativeTrainSavingsFmt') + " over driving. Maybe your luck will be better: ";
      url = url + "&text=" + encodeURIComponent(regret);
    }
    url = url + "&url=" + encodeURIComponent('https://trainsavings.goettner.net');
    url = url + "&hashtags=trainsavings";
    url = url + "&related=lewg";
    return(url);
  }.property('trainSavings'),

  actions: {
    facebookShare: function() {
      /* global FB */
      FB.ui({
        method: 'share',
        href: 'https://developers.facebook.com/docs/',
      });
    }
  }

});
