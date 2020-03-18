/* eslint-disable */
const boatCreateDtoInType = shape({
  code: uu5String(255).isRequired(),
  boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
  captainId: id().isRequired(),
  state: oneOf(["initial", "active", "final"]),
});

const boatListDtoInType = shape({
  sortBy: oneOf(["code", "time"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});


