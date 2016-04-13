require 'yaml'
require 'aws-sdk'
require 'digest'

task :deploy do
  credentials = YAML.load(File.read('./_aws_credentials.yml'))
puts credentials.inspect
  Aws.config.update(
    region: 'us-west-2',
    credentials: Aws::Credentials.new(
      credentials['key_id'],
      credentials['secret']
    )
  ) 

  local_keys = {}
  local_paths = {}
  Dir.glob('_site/**/*').each do |file|
    next if File.directory?(file)
    object_name = file.gsub(/^_site\//,'')
    checksum = Digest::MD5.hexdigest(File.read(file))
    local_keys[object_name] = checksum
    local_paths[checksum] = file
  end

  s3 = Aws::S3::Resource.new(region: 'us-west-2')
  bucket = s3.bucket('www.maketronica.com')
  remote_files = {}
  bucket.objects.each do |object|
    remote_files[object.key] = object.etag.gsub(/"/,'')
  end

  local_keys.each do |key, etag|
    next if remote_files[key] == etag
    puts "Uploading: #{key}"
    object = bucket.object(key)
    object.upload_file(local_paths[etag]) 
  end

  remote_files.each do |key, etag|
    next if local_keys[key]
    puts "Deleting: #{key}"
    bucket.object(key).delete
  end
end
