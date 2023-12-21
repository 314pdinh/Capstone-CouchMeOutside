from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import User, Journal, db
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.forms import JournalForm

journal_routes = Blueprint('journal', __name__)


@journal_routes.route('/all', methods=['GET'])
@login_required
def get_journals():
    """
    Get a list of all journals.
    """
    journals = Journal.query.all()
    return jsonify([journal.to_dict() for journal in journals])


@login_required
@journal_routes.route('/<int:journalId>', methods=['GET'])
def get_single_journal(journalId):
    journal = Journal.query.get(journalId)

    if journal is None:
        return jsonify({'message': "Journal doesn't exist"}), 404

    return jsonify(journal.to_dict()), 200


@login_required
@journal_routes.route('/<int:journalId>', methods=['DELETE'])
def delete_journal(journalId):

    journal = Journal.query.get(journalId)

    if journal is None:
        return jsonify({'message': "Journal doesn't exist"}), 404

    if current_user.id != journal.owner_id:
        return jsonify({'message': "You do not have permission to delete this journal"}), 403

    db.session.delete(journal)
    db.session.commit()

    return jsonify({'message': 'Journal deleted success'}), 200

@login_required
@journal_routes.route('/create', methods=['POST'])
def create_journal():
    form = JournalForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newJournal = Journal(
            name=form.data['name'],
            owner_id=current_user.id,
            country_name=form.data['country_name'],
            # arrival_date=form.data['arrival_date'],
            # departure_date=form.data['departure_date'],
            food_review=form.data['food_review'],
            sight_seeing_review=form.data['sight_seeing_review'],
            drinks_review=form.data['drinks_review'],
            friendliness_review=form.data['friendliness_review'],
            cleanliness_review=form.data['cleanliness_review'])

        note_description = form.data['note_description']
        memory_description = form.data['memory_description']

        newJournal.note_description = note_description if note_description != None else ""

        newJournal.memory_description = memory_description if memory_description != None else ""
 
        country_flag_image = form.data['country_flag_image']
        country_flag_image.filename = get_unique_filename(country_flag_image.filename)
        uploadCountryFlagImage = upload_file_to_s3(country_flag_image)
        if 'url' not in uploadCountryFlagImage:
            return uploadCountryFlagImage
        else:
            newJournal.country_flag_image = uploadCountryFlagImage['url']

        journal_image = form.data['journal_image']
        journal_image.filename = get_unique_filename(journal_image.filename)
        uploadJournalImage = upload_file_to_s3(journal_image)
        if 'url' not in uploadJournalImage:
            return uploadJournalImage
        else:
            newJournal.journal_image = uploadJournalImage['url']

        secondary_image = form.data['secondary_image']
        secondary_image.filename = get_unique_filename(
            secondary_image.filename)
        uploadSecondaryImage = upload_file_to_s3(secondary_image)
        if 'url' not in uploadSecondaryImage:
            return uploadSecondaryImage
        else:
            newJournal.secondary_image = uploadSecondaryImage['url']

        third_image = form.data['third_image']
        third_image.filename = get_unique_filename(third_image.filename)
        uploadThirdImage = upload_file_to_s3(third_image)
        if 'url' not in uploadThirdImage:
            return uploadThirdImage
        else:
            newJournal.third_image = uploadThirdImage['url']
            
        fourth_image = form.data['fourth_image']
        fourth_image.filename = get_unique_filename(fourth_image.filename)
        uploadFourthImage = upload_file_to_s3(fourth_image)
        if 'url' not in uploadFourthImage:
            return uploadFourthImage
        else:
            newJournal.fourth_image = uploadFourthImage['url']    

        db.session.add(newJournal)
        db.session.commit()

        journal_dict = newJournal.to_dict()
        print('success journal route')
        return journal_dict
    else:
        print('fail journal route')
        return form.errors, 400


@login_required
@journal_routes.route('/<int:journalId>', methods=['PUT'])
def edit_journal(journalId):

    journal = Journal.query.get(journalId)

    if journal is None:
        return jsonify({'message': "Journal doesn't exist"}), 404

    if current_user.id != journal.owner_id:
        return jsonify({"message": 'You do not have permission to edit this journal'}), 403

    form = JournalForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        journal.name = form.data['name']
        journal.country_name = form.data['country_name']
        
        note_description = form.data['note_description']
        memory_description = form.data['memory_description']
        
        # journal.arrival_date = form.data['arrival_date']
        # journal.departure_date = form.data['departure_date']
        journal.food_review = form.data['food_review']
        journal.sight_seeing_review = form.data['sight_seeing_review']
        journal.drinks_review = form.data['drinks_review']
        journal.friendliness_review = form.data['friendliness_review']
        journal.cleanliness_review = form.data['cleanliness_review']

        journal.note_description = note_description if note_description != None else ""
        journal.memory_description = memory_description if memory_description != None else ""


        country_flag_image = form.data['country_flag_image']
        if country_flag_image:
            country_flag_image.filename = get_unique_filename(country_flag_image.filename)
            uploadCountryFlagImage = upload_file_to_s3(country_flag_image)
            if 'url' in uploadCountryFlagImage:
                journal.country_flag_image = uploadCountryFlagImage['url']
        
        journal_image = form.data['journal_image']
        if journal_image:
            journal_image.filename = get_unique_filename(journal_image.filename)
            uploadJournalImage = upload_file_to_s3(journal_image)
            if 'url' in uploadJournalImage:
                journal.journal_image = uploadJournalImage['url']

        secondary_image = form.data['secondary_image']
        if secondary_image:
            secondary_image.filename = get_unique_filename(
                secondary_image.filename)
            uploadSecondaryImage = upload_file_to_s3(secondary_image)
            if 'url' in uploadSecondaryImage:
                journal.secondary_image = uploadSecondaryImage['url']

        third_image = form.data['third_image']
        if third_image:
            third_image.filename = get_unique_filename(third_image.filename)
            uploadThirdImage = upload_file_to_s3(third_image)
            if 'url' in uploadThirdImage:
                journal.third_image = uploadThirdImage['url']
                
        fourth_image = form.data['fourth_image']
        if fourth_image:
            fourth_image.filename = get_unique_filename(fourth_image.filename)
            uploadFourthImage = upload_file_to_s3(fourth_image)
            if 'url' in uploadFourthImage:
                journal.fourth_image = uploadFourthImage['url']       

        db.session.commit()

        journal_dict = journal.to_dict()
        return journal_dict
    else:
        return form.errors, 400

# @journal_routes.route('/<int:journal_id>/reviews', methods=["POST"])
# @login_required  # Assuming you want to require authentication for creating reviews
# def create_review(journal_id):
#     form = CreateReviewForm()
#     form.csrf_token.data = request.cookies.get('csrf_token')

#     if form.validate_on_submit():
#         new_review = Review(
#             journal_id=journal_id,
#             reviewer_id=current_user.id,
#             text=form.text.data,
#             # stars=form.stars.data
#         )

#         db.session.add(new_review)
#         db.session.commit()

#         # Fetch the user object associated with the current_user and convert it to a dictionary
#         user_dict = current_user.to_dict()

#         # Include the user information in the new_review dictionary
#         review_data = new_review.to_dict()
#         review_data['user'] = user_dict

#         return jsonify(review_data)  # Return review data with user information as JSON
#     else:
#         error_messages = []
#         for field, errors in form.errors.items():
#             for error in errors:
#                 error_messages.append(f"{form[field].label.text}: {error}")

#         return jsonify({"errors": error_messages}), 400


@journal_routes.route('/current', methods=['GET'])
@login_required
def get_user_journals():
    """
    Get a list of all journals owned by the current user.
    """
    user_journals = Journal.query.filter_by(owner_id=current_user.id).all()
    return jsonify([journal.to_dict() for journal in user_journals])