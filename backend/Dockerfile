# ビルドステージ
FROM rust:1.81 as builder

WORKDIR /usr/src/app

# 依存関係ファイルを先にコピーしてキャッシュを利用
COPY Cargo.toml Cargo.lock ./
RUN cargo fetch

# ソースコード全体をコピー
COPY . .

# リリースビルド
RUN cargo build --release

# ランタイムステージ
FROM debian:bookworm-slim

# 必要なライブラリをインストール
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/local/bin

# ビルド成果物をコピー
COPY --from=builder /usr/src/app/target/release/backend .

# 実行権限を付与
RUN chmod +x backend

# 実行コマンド
CMD ["backend"]
