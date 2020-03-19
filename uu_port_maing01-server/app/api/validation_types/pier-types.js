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
  boatCodes: array(shape({
    pierId: mongoId().isRequired(),
    code: uu5String(255).isRequired(),
    boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
    captainId: id().isRequired(),
    state: oneOf(["initial", "active", "final"]),
    insurance: oneOf(["true", "false"]).isRequired(),
  })),
  typeOfBoats:oneOf(["yacht", "barga", "tanker", "containership"]),
  slots: oneOf([1, 2]),
  busy: integer(),
  empty: integer()
});


const pierDeleteDtoInType = shape({
  id: id().isRequired()
});
const boatCreateDtoInType = shape({
  pierId: mongoId().isRequired(),
  code: uu5String(255).isRequired(),
  boatType: oneOf(["yacht", "barga", "tanker", "containership"]),
  captainId: id().isRequired(),
  state: oneOf(["initial", "active", "final"]),
  insurance: oneOf(["true", "false"]).isRequired(),
});
