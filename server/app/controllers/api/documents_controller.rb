class Api::DocumentsController < ApplicationController
  require 'libreconv'

  def create
    replacement_text = params[:text]

    test_template = ODFReport::Report.new("storage/test_template.odt") do |r|

      r.add_field :replace_me, replacement_text

    end

    # if File.exists?('storage/output.odf') do
    #   File.Delete('storage/output.odf')
    # end

    test_template.generate('storage/output.odt')
    Libreconv.convert('storage/output.odt', 'storage/output.pdf', '/Applications/LibreOffice.app/Contents/MacOS/soffice')

    send_data test_template.generate,
              type: 'application/vnd.oasis.opendocument.text',
              disposition: 'attachment',
              filename: 'test_template.odt'
  end
end
