import Exception from "./exception"

describe('Exception', () => {
  it('should correct generate string from exception', () => {
    const name = "Error";
    const message = "message";
    const code = 123;
    
    const err = new Exception(name, message, code);

    expect(err.toString()).toEqual(`[${name}] ${message} (Code: ${code})`);
  })
})