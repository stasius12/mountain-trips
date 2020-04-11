from userprofile.models import UserProfile, Participant


def test_userprofile_created(create_user):
    user = create_user()
    userprofile_qs = UserProfile.objects.all()

    assert userprofile_qs.count() == 1
    userprofile = userprofile_qs.first()
    assert userprofile.user == user
