export let employeeSaveResponses = {
  '1': {'message': "new backend has been added successfully"},

  '-1': {
    'message': "cin is required",
    'failed': 'cin'
  },

  '-2': {
    'message': "the given cin already used",
    'failed': 'cin'
  },

  '-3': {
    'message': "month number have to be positive",
    'failed': 'month'
  },

  '-4': {
    'message': "name is required",
    'failed': 'name'
  },

  '-5': {
    'message': "lastname is required",
    'failed': 'lastname'
  },

  '-6': {
    'message': "echelon is required",
    'failed': 'echelon'
  },

  '-7': {
    'message': "echelon is required",
    'failed': 'echelon'
  },

  '-8': {
    'message': "targeted echelon does not exist",
    'failed': 'echelon'
  },

  '-9': {
    'message': "entiteAdministratif is required",
    'failed': 'entite'
  },

  '-10': {
    'message': "entiteAdministratif is required",
    'failed': 'entite'
  },

  '-11': {
    'message': "targeted entite Administratif does not exist",
    'failed': 'entite'
  },
}

export let employeeUpdateResponses = {
  '1': {'message': "the backend updated successfully"},

  '-1': {'message': "No backend selected"},

  '-2': {
    'message': "the CIN is already used",
    'failed': 'cin'
  },

  '-3': {'message': "the targeted backend dose not exist",},

  '-4': {
    'message': "the given echelon does not exist",
    'failed': 'echelon'
  },

  '-5': {
    'message': "targeted entite Administratif does not exist",
    'failed': 'entite'
  },
}
