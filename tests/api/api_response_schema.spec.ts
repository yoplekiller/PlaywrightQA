import axios from 'axios';
import { load_config } from './utils/config_utils';

const env_data = load_config(); // ← 여기 핵심!!
const BASE_URL = env_data.base_url;
const API_KEY = env_data.api_key;

async function send_get_request(endpoint: string, params?: any, headers?: any) {
    try {
        const full_url = BASE_URL + endpoint;
        const response = await axios.get(full_url, { params, headers });
        attach_response(response);
        return response;
    } catch (error) {
        console.error('GET 요청 에러:', error);
        throw error;
    }
}

async function send_post_request(endpoint: string, data?: any, json_data?: any, headers?: any) {
    try {
        const full_url = BASE_URL + endpoint;
        const response = await axios.post(full_url, json_data || data, { headers });
        attach_response(response);
        return response;
    } catch (error) {
        console.error('POST 요청 에러:', error);
        throw error;
    }
}

function attach_response(response: any) {
    try {
        const json_body = JSON.stringify(response.data, null, 2);
        console.log('응답 JSON:', json_body);
    } catch (error) {
        console.log('응답 본문 (raw):', response.data);
    }
}
