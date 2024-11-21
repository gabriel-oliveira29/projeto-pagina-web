from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app) 

# Configurações do banco de dados
DB_HOST = "localhost"
DB_NAME = "Cafeinados"
DB_USER = "postgres"
DB_PASSWORD = "admin"
DB_PORT = "5432"

# Função para conectar ao banco de dados
def conectar_banco():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"Erro ao conectar ao banco de dados: {e}")
        return None

# Rota para cadastrar um produto
@app.route('/cadastrar', methods=['POST'])
def cadastrar_produto():
    produto = request.form['produto']
    categoria = request.form['categoria']
    preco = request.form['preco']
    imagem = request.files['imagem']

    # Caminho para salvar a imagem
    caminho_imagem = os.path.join('C:/Users/gabri/Desktop/site teste 1/uploads/', imagem.filename)
    imagem.save(caminho_imagem)

    # Conexão com o banco de dados
    conn = conectar_banco()
    if conn is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO produtos (nome, categoria, preco, imagem) 
                VALUES (%s, %s, %s, %s)
            """, (produto, categoria, preco, imagem.filename))
            conn.commit()
        return jsonify({"message": "Produto cadastrado com sucesso!"}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Rota para deletar produto
@app.route('/excluir/<string:nome_produto>', methods=['DELETE'])
def excluir_produto(nome_produto):
    conn = conectar_banco()
    if conn is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM produtos WHERE nome = %s", (nome_produto,))
            if cur.rowcount == 0:
                return jsonify({"error": "Produto não encontrado"}), 404
            conn.commit()
        return jsonify({"message": "Produto excluído com sucesso!"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Rota para listar produtos
@app.route('/produtos', methods=['GET'])
def listar_produtos():
    conn = conectar_banco()
    if conn is None:
        return jsonify({"error": "Erro ao conectar ao banco de dados"}), 500

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT nome, categoria, preco, imagem FROM produtos")
            produtos = cur.fetchall()
            produtos_json = [
                {"nome": produto[0], "categoria": produto[1], "preco": produto[2], "imagem": produto[3]}
                for produto in produtos
            ]
        return jsonify(produtos_json), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)