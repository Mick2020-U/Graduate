/* eslint-disable */
const pierListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


const pierCreateDtoInType = shape({
  code: uu5String(255).isRequired(),
  state: oneOf(["active", "passive", "problem"]),
  slots: oneOf(["1", "2"]),
  boatCodes: array(string()),
  typeOfBoats:array(string())
});


const pierDeleteDtoInType = shape({
  id: id().isRequired()
});

