const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    resname: {
      type: String,
      require: true,
    },
    resadd: {
      type: String,
      require: true,
    },
    respincode: {
      type: Number,
      require: true,
    },
    resstate: {
      type: String,
      require: true,
    },
    rescity: {
      type: String,
      require: true,
    },
    rescontact: {
      type: Number,
      require: true,
    },
    reslandline: {
      type: Number,
      require: true,
    },
    ownerid: {
      type: String,
      require: true,
    },
    ownername: {
      type: String,
      require: true,
    },
    ownercontact: {
      type: Number,
      require: true,
    },
    owneremail: {
      type: String,
      require: true,
    },
    rescategory: {
      type: String,
      require: true,
    },
    restypes: {
      type: Array,
      require: true,
    },
    rescuisinetype: {
      type: Array,
      require: true,
    },
    morningopeningtime: {
      type: String,
      require: true,
    },
    afternoonclosingtime: {
      type: String,
      require: true,
    },
    eveningopeningtime: {
      type: String,
      require: true,
    },
    nightclosingtime: {
      type: String,
      require: true,
    },
    resdays: {
      type: Array,
      require: true,
    },
    menuimg: {
      type: Array,
      require: true,
    },
    resimg: {
      type: Array,
      require: true,
    },
    foodimg: {
      type: Array,
      require: true,
    },
    isrespagecreated: {
      type: String,
      // default: false,
    },
    deliveryrefer: {
      type: String,
      require: true,
    },
    deliverytime: {
      type: String,
      require: true,
    },
    deliverymenuimg: {
      type: Array,
      require: true,
    },
    deliverycontact: {
      type: String,
      require: true,
    },
    deliverylandline: {
      type: String,
      require: true,
    },
    pannumber: {
      type: String,
      require: true,
    },
    panname: {
      type: String,
      require: true,
    },
    panimg: {
      type: Array,
      require: true,
    },
    isgst: {
      type: String,
      require: true,
    },
    gstnumber: {
      type: String,
      require: true,
    },
    isgst5: {
      type: String,
      require: true,
    },
    gstimg: {
      type: Array,
      require: true,
    },
    fssainumber: {
      type: String,
      require: true,
    },
    fssaiimg: {
      type: Array,
      require: true,
    },
    isdocverified: {
      type: String,
      // default: false,
    },
    bankaccnumber: {
      type: String,
      require: true,
    },
    bankholdername: {
      type: String,
      require: true,
    },
    bankacctype: {
      type: String,
      require: true,
    },
    bankifsccode: {
      type: String,
      require: true,
    },
    partnershipplan: {
      type: String,
      require: true,
    },
    isactivedelivery: {
      type: String,
    },
    ismenudigitisation: {
      type: String,
    },
    isbankdetailsverified: {
      type: String,
    },
    ispartnership: {
      type: String,
    },
    isformsubmitted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Restaurant = new mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
