import BackendService from "./backend.service";
import axios from "axios";

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve([]))
}));

describe('BackendService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch change distribution data', async () => {
    const mockCodeOne = 'USD';
    const mockCodeTwo = 'EUR';

    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getChangeDistribution(mockCodeOne, mockCodeTwo);
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/api\/change\/\?one=USD&two=EUR/));
  });

  it('should fetch session data', async () => {
    const mockCode = 'USD';

    const expectedUrl =`${process.env.REACT_APP_API_ROOT}/api/session/?code=${mockCode}`;
    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getSessionAnalysis(mockCode);
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/api\/session\/\?code=USD/));
  });

  it('should fetch statistics data', async () => {
    const mockCode = 'USD';

    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getStatistics(mockCode);
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(/api\/statistics\/\?code=USD/));
  });
})