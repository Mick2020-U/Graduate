/* eslint-disable */
const pierListDtoInType = shape({
  sortBy: oneOf(["code", "insurance"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


const pierCreateDtoInType = shape({
  code: uu5String(255).isRequired(),
  state: oneOf(["active", "passive", "problem"]),
  slots: oneOf([1, 2]).isRequired(),
  availableSlots:integer()
});


const pierDeleteDtoInType = shape({
  id: id().isRequired()
});

