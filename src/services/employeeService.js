import httpService from './httpService';

/**
 * Checks if an IPPIS number exists and returns the user's profile.
 * Otherwise, returns undefined
 * @param { Number } ippisNo 
 */
export const verifyIPPIS = async (ippisNo) => {
    const res = await httpService.get(`/employee?ippisNo=${ippisNo}`);
    console.log(res.data.data);
    return res.data.data[0];
}