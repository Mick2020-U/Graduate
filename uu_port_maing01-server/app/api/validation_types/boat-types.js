/* eslint-disable */
const boatCreateDtoInType = shape({
  id: mongoId().isRequired(),
  code: uu5String(255).isRequired(),
  boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
  captainId: id().isRequired(),
  state: oneOf(["initial", "active", "final"]),
  insurance: oneOf(["true", "false"]),
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
  boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
  captainId: id().isRequired()
});




