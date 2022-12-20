https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_sequence.png



Step 1.인가 코드 받기
서비스 서버가 카카오 인증 서버로 인가 코드 받기를 요청합니다.
카카오 인증 서버가 사용자에게 카카오계정 로그인을 통한 인증을 요청합니다.
클라이언트에 유효한 카카오계정 세션이 있거나, 카카오톡 인앱 브라우저에서의 요청인 경우 4단계로 넘어갑니다.
사용자가 카카오계정으로 로그인합니다.
카카오 인증 서버가 사용자에게 동의 화면을 출력하여 인가를 위한 사용자 동의를 요청합니다.
동의 화면은 서비스 애플리케이션(이하 앱)의 동의 항목 설정에 따라 구성됩니다.
사용자가 필수 동의 항목, 이 외 원하는 동의 항목에 동의한 뒤 [동의하고 계속하기] 버튼을 누릅니다.
카카오 인증 서버는 서비스 서버의 Redirect URI로 인가 코드를 전달합니다.
//프론트에서 처리


Step 2.토큰 받기
서비스 서버가 Redirect URI로 전달받은 인가 코드로 토큰 받기를 요청합니다.
카카오 인증 서버가 토큰을 발급해 서비스 서버에 전달합니다.
//이 토큰을 가지고 사용자 정보 가져오기를 KAKAO API에 요청하는 것

Step 3.사용자 로그인 처리
주의
서비스의 사용자 로그인 처리는 서비스에서 자체 구현해야 합니다. 이 문서는 사용자 로그인 처리 구현 시 참고할 수 있는 정보를 제공합니다.

**서비스 서버가 발급받은 액세스 토큰으로 사용자 정보 가져오기를 요청해 사용자의 회원번호 및 정보를 조회하여 서비스 회원인지 확인합니다.**
서비스 회원 정보 확인 결과에 따라 서비스 로그인 또는 회원 가입 과정을 진행합니다.
이 외 서비스에서 필요한 로그인 절차를 수행한 후, 카카오 로그인한 사용자의 서비스 로그인 처리를 완료합니다.

<GET /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
Host: kauth.kakao.com>


**카카오 로그인 동의 화면을 호출**하고, 사용자 동의를 거쳐 **인가 코드를 발급**합니다. 동의 화면은 앱에 설정된 동의 항목에 대해 사용자에게 인가(동의)를 구합니다. 인가 코드는 동의 화면을 통해 인가받은 동의 항목 정보를 갖고 있으며, 인가 코드를 사용해 토큰 받기를 요청할 수 있습니다. OpenID Connect를 사용하는 앱일 경우, 앱 설정에 따라 ID 토큰을 함께 발급받을 수 있는 인가 코드를 발급합니다.

>동의 화면
동의 화면은 사용자와 앱이 처음 연결될 때만 나타납니다. 사용자가 이미 동의 화면에서 서비스 이용에 필요한 동의 항목에 동의 완료한 경우, 해당 사용자의 카카오 로그인 시에는 동의 화면이 나타나지 않고 즉시 인가 코드가 발급됩니다. 사용자와 앱이 연결된 이후 다시 동의 화면을 통해 특정 동의 항목에 대한 사용자 동의를 요청하려면 추가 항목 동의 받기로 동의 화면을 호출할 수 있습니다. 서비스 가입 과정이 올바르게 완료되지 않아 다시 동의 화면을 호출해야 할 경우에는 연결 끊기 후 다시 인가 코드 받기를 요청합니다.

인가 코드 받기 요청은 웹 브라우저 또는 웹뷰의 카카오계정 세션 존재 여부에 따라 다르게 동작합니다.

카카오계정 세션 없음: 사용자가 카카오계정 정보를 입력하거나 카카오톡으로 로그인하는 인증 과정을 거쳐 동의 화면을 출력합니다.
카카오계정 세션 있음: 카카오계정 로그인 과정을 거치지 않고 바로 동의 화면을 출력합니다.

사용자는 동의 화면에서 서비스 이용에 필요한 동의 항목에 동의하고 로그인하거나 로그인을 취소할 수 있습니다. 카카오 인증 서버는 사용자의 선택에 따라 **요청 처리 결과를 담은 쿼리 스트링(Query string)**을 **redirect_uri**로 HTTP 302 리다이렉트(Redirect)합니다. Redirect URI는 [내 애플리케이션] > [카카오 로그인] > [Redirect URI]에 등록된 값 중 하나여야 합니다.

사용자가 모든 필수 동의 항목에 동의하고 [동의하고 계속하기] 버튼을 누른 경우
redirect_uri로 인가 코드를 담은 쿼리 스트링 전달
사용자가 동의 화면에서 [취소] 버튼을 눌러 로그인을 취소한 경우
redirect_uri로 에러 정보를 담은 쿼리 스트링 전달

**redirect-url로 온 응답**
1. 인가 코드 받기 요청 성공
code 및 state가 전달된 경우
code의 인가 코드 값으로 토큰 받기 요청
2. 인가 코드 받기 요청 실패
error 및 error_description이 전달된 경우
문제 해결, 응답 코드를 참고해 에러 원인별 상황에 맞는 서비스 페이지나 안내 문구를 사용자에게 보여주도록 처리


**Request**
Parameter
Name	Type	Description	Required
client_id	String	앱 REST API 키
[내 애플리케이션] > [앱 키]에서 확인 가능	O
redirect_uri	String	인가 코드를 전달받을 서비스 서버의 URI
[내 애플리케이션] > [카카오 로그인] > [Redirect URI]에서 등록	O
response_type	String	code로 고정	O

**Response**
Name	Type	Description	Required
code	String	토큰 받기 요청에 필요한 인가 코드	X
state	String	요청 시 전달한 state 값과 동일한 값	X
error	String	인증 실패 시 반환되는 에러 코드	X
error_description	String	인증 실패 시 반환되는 에러 메시지	X

<https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}>

RESPONSE 성공 시(동의하고 계속하기): 
<HTTP/1.1 302 Found
Content-Length: 0
Location: ${REDIRECT_URI}?code=${AUTHORIZE_CODE}>

RESPONSE 실패 시(로그인 취소):
<HTTP/1.1 302 Found
Content-Length: 0
Location: ${REDIRECT_URI}?error=access_denied&error_description=User%20denied%20access
>


기본 정보
POST /oauth/token HTTP/1.1
Host: kauth.kakao.com
Content-type: application/x-www-form-urlencoded;charset=utf-8
사전 설정	사용자 동의
플랫폼 등록
카카오 로그인 활성화
Redirect URI 등록
동의 항목
OpenID Connect 활성화(선택)	필요:
필수 동의 항목
인가 코드로 토큰 발급을 요청합니다. 인가 코드 받기만으로는 카카오 로그인이 완료되지 않으며, 토큰 받기까지 마쳐야 카카오 로그인을 정상적으로 완료할 수 있습니다.

필수 파라미터를 포함해 POST로 요청합니다. 요청 성공 시 응답은 토큰과 토큰 정보를 포함합니다. OpenID Connect를 사용하는 앱인 경우, 응답에 ID 토큰이 함께 포함됩니다. 각 토큰의 역할과 만료 시간에 대한 자세한 정보는 토큰 정보에서 확인할 수 있습니다.

액세스 토큰으로 사용자 정보 가져오기와 같은 카카오 API를 호출할 수 있습니다. 토큰 정보 보기로 액세스 토큰 유효성 검증 후, 사용자 정보 가져오기를 요청해 필요한 사용자 정보를 받아 서비스 회원 가입 및 로그인을 완료합니다.

Request
Parameter
Name	Type	Description	Required
grant_type	String	authorization_code로 고정	O
client_id	String	앱 REST API 키
[내 애플리케이션] > [앱 키]에서 확인 가능	O
redirect_uri	String	인가 코드가 리다이렉트된 URI	O
code	String	인가 코드 받기 요청으로 얻은 인가 코드	O

Response
Name	Type	Description	Required
token_type	String	토큰 타입, bearer로 고정	O
access_token	String	사용자 액세스 토큰 값	O


**request**
<curl -v -X POST "https://kauth.kakao.com/oauth/token" \
 -H "Content-Type: application/x-www-form-urlencoded" \
 -d "grant_type=authorization_code" \
 -d "client_id=${REST_API_KEY}" \
 --data-urlencode "redirect_uri=${REDIRECT_URI}" \
 -d "code=${AUTHORIZE_CODE}"
>

**response**
<HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
{
    "token_type":"bearer",
    "access_token":"${ACCESS_TOKEN}",
    "expires_in":43199,
    "refresh_token":"${REFRESH_TOKEN}",
    "refresh_token_expires_in":25184000,
    "scope":"account_email profile"
}>

