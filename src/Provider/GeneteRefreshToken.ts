import dayjs from "dayjs";
import RefreshToken from "../Models/RefreshToken";

class GenerateRefreshToken {
	async execute(userId: string) {
		const expireIn = dayjs().add(2, "m").unix();
		try {
			const generateRefreshToken = await RefreshToken.create({ userId, expireIn });
			return generateRefreshToken;
		} catch (error) {
			return error;
		}
	}
}
export default new GenerateRefreshToken();