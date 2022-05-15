# Toss
> S3 based personal storage service


- Use Cloudflare worker password protection https://www.maxivanov.io/how-to-password-protect-your-website-with-cloudflare-workers/
- NextAuth second authentication step
- s3fs mounting as linux drive
- on-device encryption
- electron desktop app
- use pnpm

# backupbucket
> my personal backup solution using AWS S3 buckets
the most cost-effective and privacy-respecting

I use this script to backup my personal data to AWS S3 buckets, for just money amount
This is by far the most cost-effective and versatile personal backup solution. 
ENCRYPTED AND COMPRESSED WITH Mounting in linux

<!--ts-->
   * [:mag: Criterias](#criterias)
        * [Data Privacy](#data-privacy)
        * [Pricing](#pricing)
        * [Shell script](#shell-script)
        * [Compatibility](#compatibility)
   * [:wastebasket: S3 buckets](#s3-buckets)
      * [Getting Started](#getting-started)
      * [Create bucket](#intelligent-tiering)
      * [Get credentials](#intelligent-tiering)
      * [Intelligent Tiering](#intelligent-tiering)
   * [:rocket: Installation](#installation)
        * [Download the script](#download-the-script)
        * [Make it executable](#make-it-executable)
        * [Install dependencies](#install-dependencies)
   * [:pager: Usage](#usage)
      * [Compression](#compression)
      * [Encryption](#encryption)
      * [One-time backup](#one-time-backup) 
      * [Synchronization](#synchronization)
      * [Scheduling](#scheduling)
   * [:penguin: Mounting in Linux](#mounting-in-linux)
      * [S3FS](#S3FS)
      * [Decryption](#decryption)
      * [Decompression](#decompression)
<!--te-->

# Criterias
privacy-respecting, redicoulus pricing, no API, like to own my own data

## Data Privacy
eventough amazon s3 encryption exist, i dont trust and rather encrypt on my own device first
GPG encryption?
## Pricing
## Shell script
POSIX-compliant
fast and efficient
easy to use command line tool
encrypted by default
auto updates
## Compression
## Compatibility
# S3 buckets
## Getting Started
## Create bucket
## Get credentials
## Intelligent Tiering
# Installation

## Download the script
```Shell
curl -LO physics.sh/backupbucket.sh
```
## Make it executable
```Shell
chmod +x backupbucket.sh
```
## Install dependencies
```Shell
./backupbucket install
```
or install the following dependencies manually
- xz
- openssl
- jq
- aws-cli

Additionally, the following trivial ones are likely already installed on your Linux system.

- bash
- md5sum
- sha256sum
- dd
- xxd
- cut
- tar


# Usage

## ⚙️ Config
Create .config file

Configuration for the profile stack. Located by default in `bucket.config` at the root of your repository. Below is an example config:

```yml
- name: Golang
  logo: go
  url: https://golang.org/
  color: '#7FD6EA'
  projects:
    - url: https://github.com/gleich/fgh
    - url: https://github.com/gleich/gh_fsync
    - url: https://github.com/gleich/nuke
    - url: https://github.com/gleich/logoru
    - url: https://github.com/gleich/statuser

- name: Python
  logo: python
  url: https://www.python.org/
  color: '#3C78A9'
  projects:
    - url: https://github.com/gleich/profile_stack
    - url: https://github.com/gleich/Contribution-Hat
```

So for each technology, there are the following fields you need to fill in:

| **Key**      | **Example Value**                                                                                       | **Description**                                                   | **Default** |
| ------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------- |
| `name`       | Dart                                                                                                    | Name of the technology                                            | Required    |
| `logo`       | dart                                                                                                    | [Logo](https://simpleicons.org/) for the technology               | Required    |
| `url`        | https://flutter.dev/                                                                                    | URL for the technology                                            | Required    |
| `logo_color` | FFFFFF                                                                                                  | Hex color code for the logo color                                 | `#FFFFFF`   |
| `color`      | 52C0F2                                                                                                  | Hex color code for the background color                           | Required    |
| `projects`   | `- url: https://github.com/gleich/Personal-Site` </br> `- url: https://github.com/gleich/fgh` | List of GitHub project URLs or [project objects](#project-object) | Required    |

### Project object

You pass a list of YAML objects to the `projects` field.

| **Key** | **Example Value**                              | **Description**                    | **Default** |
| ------- | ---------------------------------------------- | ---------------------------------- | ----------- |
| `url`   | `https://github.com/gleich/Personal-Site` | URL to a GitHub project            | Required    |
| `wip`   | `true`                                         | Mark a project as work-in-progress | `false`     |

## 🤖 Action Configuration

Here is an example config:

```yaml
name: stack

on:
  push:
    branches:
      - main

jobs:
  profile_stack:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: gleich/profile_stack@master
        with:
          path: config/stack.yml
          badges: false
          technology_emoji: 👨🏻‍💻
          project_emoji: ✨
```

You can also configure the following when declaring your action:

| **Key**            | **Example Value** | **Description**                                                   | **Default** |
| ------------------ | ----------------- | ----------------------------------------------------------------- | ----------- |
| `path`             | config/stack.yml  | The path in your repository where the config file is located      | `stack.yml` |
| `badges`           | `false`           | Don't have badges, just plain old urls                            | `false`     |
| `technology_emoji` | 👨🏻‍💻                | The character to be displayed to the left of the Technology title | `💻`        |
| `project_emoji`    | ✨                | The character to be displayed to the left of the Project title    | `🚀`        |



Config file or arguments??

## Compression

## Encryption
on-device encryption is enabled by default to disable it, simply add the ```--no-encryption``` tag 
GPG encryption?

## One-time backup
```Shell
./backupbucket -yes
```
## Synchronization
watch file changes
```Shell
./backupbucket -yes
```
## Scheduling
cron job on boot up
```Shell
./backupbucket -yes
```


# Mounting in Linux
To easily inspect the contents of our bucket you might want to mount it as a local drive to your linux directory. But we encrypted and compress so in order to not insepct jibberish we first have to decompress and decrypt our files. Than we use With a tool called (s3fs)[https://github.com/s3fs-fuse/s3fs-fuse] posix compliant tool s3fs s3fs allows Linux and macOS to mount an S3 bucket via FUSE. s3fs preserves the native object format for files, allowing use of other tools like AWS CLI.

## S3FS
## Decryption
## Decompression


S3FS, a special solution based on FUSE (file system in user space), was developed to mount S3 buckets to directories of Linux operating systems similarly to the way you mount CIFS or NFS share as a network drive. S3FS is a free and open source solution. After mounting Amazon S3 cloud storage with S3FS to your Linux machine, you can use cp, mv, rm, and other commands in the Linux console to operate with files as you do when working with mounted local or network drives. S3FS is written on Python and you can familiarize yourself with the source code on GitHub.

GPG decrypt with s3fs
https://stackoverflow.com/questions/59059399/how-to-stream-s3-file-as-input-for-gpg-encryption-and-meanwhile-stream-the-encry
https://www.nakivo.com/blog/mount-amazon-s3-as-a-drive-how-to-guide/

https://cloud.netapp.com/blog/amazon-s3-as-a-file-system
