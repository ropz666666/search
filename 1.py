from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
# 具体返回值参考https://aithub.com.cn:5040/docs
app = Flask(__name__)
CORS(app)  # 这一行添加了CORS配置
url1 = 'https://aithub.com.cn:5040/new'
url2 = 'https://aithub.com.cn:5040/search'
url3 = 'https://aithub.com.cn:5040/dialogue'

# 分配uid
# response1 = requests.get(url1)
# uid = response1.json()['uid']


@app.route('/chat', methods=['POST'])
def chat():
    response1 = requests.get(url1)
    uid = response1.json()['uid']
    user_question = request.json.get('message')
    print(user_question)
    url3 = 'https://aithub.com.cn:5040/dialogue'
    # 初始化用户给ai的问题
    # message = ''

    message = '今天的天气怎么样'  
    body_for_AI = {
        "uid": uid,
        "message": user_question
    }

    # AI对话功能
    response3 = requests.put(url3, json=body_for_AI)
    print(response3.json())
    return jsonify(response3.json())




@app.route('/search', methods=['POST'])
def search():
# 初始化搜索问题

    response1 = requests.get(url1)
    uid = response1.json()['uid']
    user_question = request.json.get('message')
    print(user_question)
    body_for_search = {
        "uid": uid,
        "query": user_question
    }
    # 搜索功能
    response2 = requests.post(url2, json=body_for_search)
    print(response2.json())
    return jsonify(response2.json())


def get_access_token():
    """
    使用 API Key，Secret Key 获取access_token，替换下列示例中的应用API Key、应用Secret Key
    """
    url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=UStT6bCxFgz9jVHxtaeTptAM&client_secret=8HT1irXNCESa26Y6qG64S1EWj9lZ1LlO"
    payload = json.dumps("")
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    try:
        response = requests.request("POST", url, headers=headers, data=payload)
        return response.json().get("access_token")
    except Exception as e:
        print(f"获取access_token时发生错误: {e}")
        return None


@app.route('/api/ask', methods=['POST'])
def main():
    try:
        user_question = request.json.get('message')
        if user_question is None:
            return jsonify({"error": "message字段未提供"}), 400

        url = f"https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed?access_token={get_access_token()}"
        payload = json.dumps({
            "messages": [
                {
                    "role": "user",
                    "content": user_question
                }
            ]
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text)
        return jsonify(response.text)
    except Exception as e:
        print(f"处理请求时发生错误: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

