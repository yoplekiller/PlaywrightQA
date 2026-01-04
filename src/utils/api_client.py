import requests
import allure
import json
from utils.config_utils import load_config


env_data = load_config()


BASE_URL = env_data["base_url"]
API_KEY = env_data["api_key"]



@allure.step("GET 요청 보내기")
def send_get_request(endpoint, params=None, headers=None):
    """
    지정한 endpoint 로 GET 요청을 보내고,
    응답을 Allure 리포트에 첨부한 뒤 Response 객체를 반환하는 함수
    """
    try:
        full_url = BASE_URL + endpoint
        response = requests.get(full_url, params=params, headers=headers)
        attach_response(response)
        response.raise_for_status()
        return response

    # 네트워크 에러, 타임아웃, 4xx/5xx 등 requests 관련 예외를 한 번에 처리
    except requests.exceptions.RequestException as e:
        allure.attach(
            str(e),                           # 예외 내용을 문자열로 변환
            name="GET 요청 에러",            # 리포트에 보이는 제목
            attachment_type=allure.attachment_type.TEXT  # 첨부 타입: 일반 텍스트
        )
        raise



@allure.step("POST 요청 보내기")
def send_post_request(endpoint, data=None, json_data=None, headers=None):
    """
    지정한 endpoint 로 POST 요청을 보내고,
    응답을 Allure 리포트에 첨부한 뒤 Response 객체를 반환하는 함수
    """
    try:
        full_url = BASE_URL + endpoint


        response = requests.post(
            full_url,
            data=data,
            json=json_data,
            headers=headers
        )

        # 응답 내용을 Allure 리포트에 첨부 (JSON 또는 텍스트)
        attach_response(response)

        # HTTP 상태 코드가 4xx, 5xx 인 경우 예외 발생
        response.raise_for_status()

        # 정상 응답일 경우 Response 객체 반환
        return response

    except requests.exceptions.RequestException as e:
        # 예외 메시지를 Allure 리포트에 텍스트 형태로 첨부
        allure.attach(
            str(e),
            name="POST 요청 에러",
            attachment_type=allure.attachment_type.TEXT
        )
        # 예외를 다시 올려서(raise) 테스트가 실패하도록 함
        raise



@allure.step("API 응답 결과 첨부")
def attach_response(response):
    """
    requests.Response 객체를 받아서,
    가능한 경우 JSON 으로 pretty print 하여 Allure 에 첨부하고,
    JSON 이 아니면 raw 텍스트로 첨부하는 함수
    """
    try:
        # response.json() : 응답 본문을 JSON 으로 파싱 (dict / list 반환)
        # json.dumps(..., ensure_ascii=False) :
        #   한글이 깨지지 않도록 그대로 출력하도록 설정
        # indent=2 : 보기 좋게 들여쓰기 적용
        json_body = json.dumps(
            response.json(),
            indent=2,
            ensure_ascii=False
        )

        # 파싱한 JSON 문자열을 Allure 리포트에 JSON 타입으로 첨부
        allure.attach(
            json_body,                               # 첨부할 JSON 문자열
            name="응답 JSON",                        # 리포트에 보이는 이름
            attachment_type=allure.attachment_type.JSON  # 첨부 타입: JSON
        )

    # JSON 파싱에 실패했거나 다른 예외가 발생한 경우 (예: HTML, 일반 텍스트 응답 등)
    except Exception:
        # response.text : 응답 본문을 문자열(raw)로 그대로 가져옴
        # 이 내용을 텍스트 타입으로 Allure 에 첨부
        allure.attach(
            response.text,                          # 원본 텍스트
            name="응답 본문 (raw)",                # 리포트에 보이는 이름
            attachment_type=allure.attachment_type.TEXT  # 첨부 타입: 텍스트
        )
