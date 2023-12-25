import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { env } from '@/env.mjs'
import { randomUUID } from 'crypto'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { type PresignedUrlResponse } from '@/types/presignedUrlResponse.type'

class S3Service {
  private s3Client: S3Client
  private bucketName: string = env.S3_BUCKET_NAME

  constructor() {
    this.s3Client = new S3Client({
      region: env.S3_BUCKET_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY
      }
    })
  }

  public async generatePresignedUrl(
    fileType: string
  ): Promise<PresignedUrlResponse> {
    const key = `${randomUUID()}.${fileType}`

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: `image/${fileType}`
    })

    const uploadUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 5
    })

    return {
      uploadUrl,
      key
    }
  }

  public generateImageUrl(key: string): string {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`
  }

  public async deleteImage(key: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: key
    }

    const command = new DeleteObjectCommand(params)

    await this.s3Client.send(command)
  }
}

export const s3Service = new S3Service()
