# IAM Configuration

## 1. Create Trust Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Save it as trust-policy.json.

## 2. Create Role:

```bash
aws iam create-role \
    --role-name MyEC2Role \
    --assume-role-policy-document file://trust-policy.json
```

## 3. Create Permissions Policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}
```
Save it as permissions-policy.json.

## 4. Create and Attach the Policy:

```bash
aws iam create-policy \
    --policy-name MyS3FullAccessPolicy \
    --policy-document file://permissions-policy.json
```

## 5. Attach the policy to the role:

```bash
aws iam attach-role-policy \
    --role-name MyEC2Role \
    --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/MyS3FullAccessPolicy
```