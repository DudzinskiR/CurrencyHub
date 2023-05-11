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

    const expectedUrl =`${process.env.REACT_APP_API_ROOT}/api/change/?one=${mockCodeOne}&two=${mockCodeTwo}`;
    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getChangeDistribution(mockCodeOne, mockCodeTwo);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should fetch session data', async () => {
    const mockCode = 'USD';

    const expectedUrl =`${process.env.REACT_APP_API_ROOT}/api/session/?code=${mockCode}`;
    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getSessionAnalysis(mockCode);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should fetch statistics data', async () => {
    const mockCode = 'USD';

    const expectedUrl =`${process.env.REACT_APP_API_ROOT}/api/statistics/?code=${mockCode}`;
    jest.spyOn(axios, 'get').mockResolvedValue([]);

    await BackendService.getStatistics(mockCode);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });
})