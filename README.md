🚧 a work in progress 🚧

# 🌱 Sprout

> S3 based personal storage and file sharing service

## Features

- Web-based file uploader to S3
- Bucket explorer
- Password protected file sharing
- Optional on-device encryption
- Mountable as system drive

## Develop locally

```bash
git clone https://github.com/paulphys/sprout
cd sprout
yarn
yarn dev
```

Rename `.env.example` file to `.env` and fill in the values for

- `S3_ENDPOINT`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `APP_PASSWORD`

## Deploy to Vercel ▲

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fpaulphys%2Fnext-magic-auth)

Add all credentials as [Environment Variables](https://vercel.com/docs/environment-variables) to the production build.
