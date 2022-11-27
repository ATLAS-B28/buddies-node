let {expect} = require('expect');

var {generateMessage, generateLocationMap} = require('./message');

describe('Generate Message', () => {
  it("should generate correct message object", ()=> {
    let from = "WDJ",
        text = "Some random text"
        message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});

describe('Generate Location Message',()=>{
  it('It should generate correct location object',()=>{
    let from = 'Aditya',
        lat= 15.67,
        log=56.78,
        url=`https://www.google.com/maps?q=${lat},${log}`,
        message = generateLocationMap(from,lat,log)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from, url});
  })
})