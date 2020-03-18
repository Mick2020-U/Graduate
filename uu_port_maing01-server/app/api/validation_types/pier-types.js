/* eslint-disable */
const pierListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


const pierCreateDtoInType = shape({
  capacity: integer(),
  boatCodes: array(string()),
  typeOfBoats:array(string())
});
