# AWS STS (AWS Security Token Service)

## Get Caller Identity

```bash
aws sts get-caller-identity
```

## Get Assume Role

```bash
aws sts assume-role \
    --role-arn "arn:aws:iam::ACCOUNT_ID:role/ROLE_NAME" \
    --role-session-name "SessionName"
```

### Example

```bash
aws sts assume-role --role-arn arn:aws:iam::075377842827:role/demo-webrtc-role --role-session-name DemoWebRTC
```

You will get the following results:

```json
{
  "Credentials": {
    "AccessKeyId": "...",
    "SecretAccessKey": "...",
    "SessionToken": "...",
    "Expiration": "2024-10-17T00:00:01Z"
  }
}
```