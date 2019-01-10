class Api::DocumentsController < ApplicationController
  require 'libreconv'

  def show
    File.open('storage/output.pdf') do |f|
      send_data f.read, type: 'application/pdf'
    end
  end

  def create
    replacement_text = params[:text]

    test_template = ODFReport::Report.new("storage/test_template.odt") do |r|

      r.add_field :replace_me, replacement_text

    end

    if File.exists?('storage/output.odt')
      File.delete('storage/output.odt')
      File.delete('storage/output.pdf')
    end

    test_template.generate('storage/output.odt')
    Libreconv.convert('storage/output.odt', 'storage/output.pdf', '/Applications/LibreOffice.app/Contents/MacOS/soffice')

    # send_file 'storage/output.pdf'
    #           type: 'application/pdf',
    #           disposition: 'attachment',
    #           filename: 'test_pdf.pdf'

    head 200 and return
  end
end
