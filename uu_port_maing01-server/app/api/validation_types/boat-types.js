/* eslint-disable */
const boatCreateDtoInType = shape({
  pierId: mongoId().isRequired(),
  code: uu5String(255).isRequired(),
  boatType: oneOf(["1","2"]).isRequired(),
  captainId: id().isRequired(),
  state: oneOf(["initial", "active", "final"]),
  insurance: oneOf(["true", "false"]).isRequired(),
});

const boatListDtoInType = shape({
  sortBy: oneOf(["id", "code"]),
  order: oneOf(["asc", "desc"]),
  boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
  insurance: oneOf(["true", "false"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const boatUpdateDtoInType = shape({
  id: mongoId().isRequired(),
  code: code().isRequired(),
  boatType: oneOf(["1","2"]).isRequired(),
  captainId: id().isRequired()
});




