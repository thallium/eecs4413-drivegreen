export const getVehiclesFunc = {
  name: 'getVehicles',
  description: 'get information of all vehicles in stock',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
};


export const getOrdersByEmail = {
  name: 'getOrdersByEmail',
  description: 'get all orders of a user',
  parameters: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'email of the user',
      },
    },
    required: ['email'],
  },
};


export const getHotdeals = {
  name: 'getHotdeals',
  description: 'get all hotdeals',
  parameters: {
    type: 'object',
    properties: {},
    required: [],
  },
};


export const getOptionsFunc = {
  name: 'getOptions',
  description: 'propose a few action options to the user along with the answer',
  parameters: {
    type: 'object',
    properties: {
      vid: {
        type: 'string',
        description:
          'prompt a link to view details of the vehicle with this id',
      },

      oid: {
        type: 'string',
        description: 'prompt a link to view details of the order with this id',
      },

      hotdeal: {
        type: 'boolean',
        description: 'prompt a link to view the hotdeals',
      },

      add_vid: {
        type: 'string',
        description:
          'prompt a button to add the vehicle with this id to shopping cart',
      },

      login: {
        type: 'boolean',
        description: 'prompt a link to redirect user to login',
      },
    },
    required: [],
  },
};


export const addToShoppingCartFunc = {
  name: 'addToShoppingCart',
  description: 'add a vehicle to shopping cart',
  parameters: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'email of the user',
      },
      vid: {
        type: 'string',
        description: 'id of the vehicle',
      },
    },
    required: ['email', 'vid'],
  },
};
