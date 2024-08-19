from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json
# 具体返回值参考https://aithub.com.cn:5040/docs
app = Flask(__name__)
CORS(app)  # 这一行添加了CORS配置
url1 = 'https://aithub.com.cn:5040/new'
url2 = 'https://aithub.com.cn:5040/search'
url3 = 'https://aithub.com.cn:5040/dialogue'
url4 = 'https://aithub.com.cn:5040/case'
url5 = 'https://aithub.com.cn:5040/technology'
url6 = 'https://aithub.com.cn:5040/managements'

method1 = 'near'  # 近：subsector 中：division 远：sector
method2 = 'mid'
method3 = 'far'
method4 = 'detail'
# 分配uid

# response1 = requests.get(url1)
# uid = response1.json()['uid']

#response3 = requests.put(url3, json=body_for_AI)
@app.route('/chat', methods=['POST'])
def chat():
    response1 = requests.get(url1, verify=False)
    uid = response1.json()['uid']
    user_question = request.json.get('message')
    body_for_AI = {
        "uid": uid,
        "sector_id": 1,
        "message": user_question
    }

    print(user_question)
    # AI对话功能
    response3 = requests.put(url3, json=body_for_AI)
    print(response3.json())
    return jsonify(response3.json())




@app.route('/search', methods=['POST'])
def search():
# 初始化搜索问题

    response1 = requests.get(url1, verify=False)
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


# response4_4 = requests.get(url4 + f'/{id}?method={method4}')
# "response_4": response4_4.json()
@app.route('/sectors', methods=['POST'])
def sectors():
    # 近中远迁移
    id = request.json.get('id')
    print(id)
    response4_1 = requests.get(url4 + f'/{id}?method={method1}')
    response4_2 = requests.get(url4 + f'/{id}?method={method2}')
    response4_3 = requests.get(url4 + f'/{id}?method={method3}')
    response5 = requests.get(url4 + f'/{id}?method={method4}')

    print("原始响应内容:", response4_1.text)
    response_json = {
            "response_1": response4_1.json(),
            "response_2": response4_2.json(),
            "response_3": response4_3.json(),
            "response_4": response5.json(),
         }
    print(response_json)
    return response_json

##ai分析 文件
@app.route('/case_filesUpload', methods=['POST'])
def case_filesUpload():

    # 获取上传的文件
    file_path = request.json.get('file_path')
    file_path = os.path.normpath(file_path)
    print(file_path)
    try:
        with open(file_path, 'rb') as file:
            response = requests.post(url4 + '/file', files={"file": file})
            print(response.json())
            return jsonify(response.json())
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
##ai分析 url
@app.route('/case_urlUpload', methods=['POST'])
def case_urlUpload():

    # 获取上传的文件
    url = request.json.get('url')
    # file_path = 'E:\\search html\\123.xlsx'
    print(url)
    response = requests.post(url4 + '/url', data=json.dumps(url))
    print(response.json())
    return response.json()


##上传技术
@app.route('/technology_submit', methods=['POST'])
def technology_submit():

    title = request.json.get('title')
    classification = request.json.get('classification')
    description = request.json.get('description')
    print(title)
    print(classification)
    print(description)
    body_for_technology_upload = {
        "title": title,
        "classification": classification,
        "description": description
    }
    response = requests.post(url5,json=body_for_technology_upload)
    print(response.json())
    return response.json()

# # 用户点击上传案例
# response8 = requests.post(url4, json=body_for_case_upload)
#
@app.route('/case_submit', methods=['POST'])
def case_submit():
    sector = request.json.get('sector')
    division = request.json.get('division')
    subsector = request.json.get('subsector')
    text = request.json.get('text')
    print(sector)
    print(division)
    print(subsector)
    print(text)
    body_for_case_upload = {
        "sector": sector,
        "division": division,
        "subsector": subsector,
        "text": text
    }
    response8 = requests.post(url4, json=body_for_case_upload)
    print(response8.json())
    return response8.json()

@app.route('/manage_reflash', methods=['POST'])
def manage_reflash():
    response11 = requests.get(url6)
    # # 管理员确认上传信息（向量化、存入数据库）
    print(response11.json())
    return response11.json()
@app.route('/manage_submit', methods=['POST'])
def manage_submit():
    response12 = requests.post(url6)
    # # 管理员确认上传信息（向量化、存入数据库）
    print(response12.json())
    return response12.json()



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

